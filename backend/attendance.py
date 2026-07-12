from flask import request, jsonify
from database import get_connection
from datetime import date


# -----------------------------------
# Save Attendance
# -----------------------------------

def save_attendance():

    data = request.get_json()

    employee_id = data.get("employee_id")
    attendance_date = data.get("attendance_date")
    status = data.get("status", "Present")

    conn = get_connection()
    cur = conn.cursor()

    # Check employee exists
    cur.execute(
        "SELECT employee_id FROM employees WHERE employee_id=%s",
        (employee_id,)
    )

    if cur.fetchone() is None:

        cur.close()
        conn.close()

        return jsonify({
            "message": "Employee not found"
        }), 404

    # Prevent duplicate attendance
    cur.execute(
        """
        SELECT attendance_id
        FROM attendance
        WHERE employee_id=%s
        AND attendance_date=%s
        """,
        (employee_id, attendance_date)
    )

    if cur.fetchone():

        cur.close()
        conn.close()

        return jsonify({
            "message": "Attendance already marked"
        }), 400

    cur.execute(
        """
        INSERT INTO attendance
        (
            employee_id,
            attendance_date,
            employee_status,
            hr_status,
            final_status
        )
        VALUES
        (
            %s,
            %s,
            %s,
            'Pending',
            'Pending'
        )
        """,
        (
            employee_id,
            attendance_date,
            status
        )
    )

    conn.commit()

    cur.close()
    conn.close()

    return jsonify({
        "message": "Attendance Saved Successfully"
    })


# -----------------------------------
# Get Attendance
# -----------------------------------

def get_attendance():

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            attendance_id,
            employee_id,
            attendance_date,
            employee_status,
            hr_status,
            final_status
        FROM attendance
        ORDER BY attendance_id DESC
    """)

    rows = cur.fetchall()

    cur.close()
    conn.close()

    result = []

    for row in rows:

        result.append({

            "attendance_id": row[0],
            "employee_id": row[1],
            "attendance_date": str(row[2]),
            "employee_status": row[3],
            "hr_status": row[4],
            "final_status": row[5]

        })

    return jsonify(result)


# -----------------------------------
# HR Verify Attendance
# -----------------------------------

def update_attendance(attendance_id):

    data = request.get_json()

    decision = data.get("status")

    if decision == "Approved":

        final_status = "Present"

    else:

        final_status = "Absent"

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        UPDATE attendance
        SET
            hr_status=%s,
            final_status=%s,
            verified_at=CURRENT_TIMESTAMP
        WHERE attendance_id=%s
        """,
        (
            decision,
            final_status,
            attendance_id
        )
    )

    conn.commit()

    cur.close()
    conn.close()

    return jsonify({
        "message": "Attendance Updated Successfully"
    })


# -----------------------------------
# Delete Attendance
# -----------------------------------

def delete_attendance(attendance_id):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        DELETE FROM attendance
        WHERE attendance_id=%s
        """,
        (attendance_id,)
    )

    conn.commit()

    cur.close()
    conn.close()

    return jsonify({
        "message": "Attendance Deleted Successfully"
    })


# -----------------------------------
# Finalize Today's Attendance
# -----------------------------------

def finalize_attendance():

    today = date.today()

    conn = get_connection()
    cur = conn.cursor()

    # Approve all pending attendance
    cur.execute(
        """
        UPDATE attendance
        SET
            hr_status='Approved',
            final_status='Present',
            verified_at=CURRENT_TIMESTAMP
        WHERE attendance_date=%s
        AND hr_status='Pending'
        """,
        (today,)
    )

    # Employees who didn't mark attendance
    cur.execute(
        """
        SELECT employee_id
        FROM employees
        WHERE employee_id NOT IN
        (
            SELECT employee_id
            FROM attendance
            WHERE attendance_date=%s
        )
        """,
        (today,)
    )

    employees = cur.fetchall()

    for employee in employees:

        cur.execute(
            """
            INSERT INTO attendance
            (
                employee_id,
                attendance_date,
                employee_status,
                hr_status,
                final_status,
                verified_at
            )
            VALUES
            (
                %s,
                %s,
                'Not Marked',
                'Auto',
                'Absent',
                CURRENT_TIMESTAMP
            )
            """,
            (
                employee[0],
                today
            )
        )

    conn.commit()

    cur.close()
    conn.close()

    return jsonify({
        "message": "Today's Attendance Finalized Successfully"
    })