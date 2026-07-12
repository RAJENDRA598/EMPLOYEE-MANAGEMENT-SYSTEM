from flask import request, jsonify
from database import get_connection


# -----------------------------
# Apply Leave
# -----------------------------
def apply_leave():

    data = request.get_json()

    employee_id = data.get("employee_id")
    reason = data.get("reason")
    leave_date = data.get("leave_date")

    if not employee_id or not reason or not leave_date:

        return jsonify({
            "message": "All fields are required"
        }), 400


    conn = get_connection()
    cur = conn.cursor()

    # Check employee exists

    cur.execute("""

        SELECT employee_id

        FROM employees

        WHERE employee_id=%s

    """, (employee_id,))

    employee = cur.fetchone()

    if employee is None:

        cur.close()
        conn.close()

        return jsonify({
            "message": "Employee ID not found"
        }), 404


    # Check duplicate leave

    cur.execute("""

        SELECT leave_id

        FROM leaves

        WHERE employee_id=%s

        AND leave_date=%s

    """, (employee_id, leave_date))

    leave = cur.fetchone()

    if leave:

        cur.close()
        conn.close()

        return jsonify({
            "message": "Leave already applied"
        }), 400


    # Save leave

    cur.execute("""

        INSERT INTO leaves
        (
            employee_id,
            reason,
            leave_date,
            status
        )

        VALUES
        (
            %s,%s,%s,'Pending'
        )

    """, (employee_id, reason, leave_date))

    conn.commit()

    cur.close()
    conn.close()

    return jsonify({
        "message": "Leave Applied Successfully"
    })


# -----------------------------
# Get Leave List
# -----------------------------
def get_leaves():

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""

        SELECT
            leave_id,
            employee_id,
            reason,
            leave_date,
            status

        FROM leaves

        ORDER BY leave_id DESC

    """)

    rows = cur.fetchall()

    cur.close()
    conn.close()

    leave_list = []

    for row in rows:

        leave_list.append({

            "leave_id": row[0],
            "employee_id": row[1],
            "reason": row[2],
            "leave_date": str(row[3]),
            "status": row[4]

        })

    return jsonify(leave_list)


# -----------------------------
# Update Leave
# -----------------------------
def update_leave(leave_id):

    data = request.get_json()

    status = data.get("status")

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""

        UPDATE leaves

        SET status=%s

        WHERE leave_id=%s

    """, (status, leave_id))

    conn.commit()

    cur.close()
    conn.close()

    return jsonify({

        "message":"Leave Updated Successfully"

    })
# -----------------------------
# Delete Leave
# -----------------------------
def delete_leave(leave_id):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""

        DELETE FROM leaves

        WHERE leave_id=%s

    """, (leave_id,))

    conn.commit()

    cur.close()
    conn.close()

    return jsonify({
        "message": "Leave Deleted Successfully"
    })