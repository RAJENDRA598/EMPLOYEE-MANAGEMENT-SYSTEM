from flask import request, jsonify

from database import get_connection


# -----------------------------------
# Add Employee
# -----------------------------------

def add_employee():

    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")
    department = data.get("department")
    designation = data.get("designation")
    salary = data.get("salary")
    joining_time = data.get("joining_time")

    if not name or not email:

        return jsonify({
            "message": "Name and Email are required"
        }), 400

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""

        SELECT *
        FROM employees
        WHERE email=%s

    """, (email,))

    employee = cur.fetchone()

    if employee:

        cur.close()
        conn.close()

        return jsonify({
            "message": "Employee already exists"
        }), 400

    cur.execute("""

        INSERT INTO employees
        (
            name,
            email,
            phone,
            department,
            designation,
            salary,
            joining_time
        )

        VALUES
        (
            %s,%s,%s,%s,%s,%s,%s
        )

    """, (

        name,
        email,
        phone,
        department,
        designation,
        salary,
        joining_time

    ))

    conn.commit()

    cur.close()
    conn.close()

    return jsonify({
        "message": "Employee added successfully"
    }), 201


# -----------------------------------
# Get All Employees
# -----------------------------------

def get_employees():

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""

        SELECT
            employee_id,
            name,
            email,
            phone,
            department,
            designation,
            salary,
            joining_time,
            created_at

        FROM employees

        ORDER BY employee_id DESC

    """)

    rows = cur.fetchall()

    cur.close()
    conn.close()

    employee_list = []

    for emp in rows:

        employee_list.append({

            "employee_id": emp[0],
            "name": emp[1],
            "email": emp[2],
            "phone": emp[3],
            "department": emp[4],
            "designation": emp[5],
            "salary": float(emp[6]) if emp[6] else 0,
            "joining_time": str(emp[7]) if emp[7] else "",
            "created_at": str(emp[8])

        })

    return jsonify(employee_list)


# -----------------------------------
# Get Single Employee
# -----------------------------------

def get_employee(employee_id):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""

        SELECT
            employee_id,
            name,
            email,
            phone,
            department,
            designation,
            salary,
            joining_time

        FROM employees

        WHERE employee_id=%s

    """, (employee_id,))

    employee = cur.fetchone()

    cur.close()
    conn.close()

    if employee is None:

        return jsonify({
            "message": "Employee not found"
        }), 404

    return jsonify({

        "employee_id": employee[0],
        "name": employee[1],
        "email": employee[2],
        "phone": employee[3],
        "department": employee[4],
        "designation": employee[5],
        "salary": float(employee[6]) if employee[6] else 0,
        "joining_time": str(employee[7]) if employee[7] else ""

    })


# -----------------------------------
# Update Employee
# -----------------------------------

def update_employee(employee_id):

    data = request.get_json()

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""

        UPDATE employees

        SET

            name=%s,
            email=%s,
            phone=%s,
            department=%s,
            designation=%s,
            salary=%s,
            joining_time=%s

        WHERE employee_id=%s

    """, (

        data.get("name"),
        data.get("email"),
        data.get("phone"),
        data.get("department"),
        data.get("designation"),
        data.get("salary"),
        data.get("joining_time"),
        employee_id

    ))

    conn.commit()

    cur.close()
    conn.close()

    return jsonify({
        "message": "Employee updated successfully"
    })


# -----------------------------------
# Delete Employee
# -----------------------------------

def delete_employee(employee_id):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""

        DELETE FROM employees

        WHERE employee_id=%s

    """, (employee_id,))

    conn.commit()

    cur.close()
    conn.close()

    return jsonify({
        "message": "Employee deleted successfully"
    })


# -----------------------------------
# Search Employee
# -----------------------------------

def search_employee():

    keyword = request.args.get("keyword", "")

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""

        SELECT
            employee_id,
            name,
            email,
            department,
            designation

        FROM employees

        WHERE

            LOWER(name) LIKE LOWER(%s)

            OR LOWER(email) LIKE LOWER(%s)

            OR LOWER(department) LIKE LOWER(%s)

            OR LOWER(designation) LIKE LOWER(%s)

        ORDER BY employee_id DESC

    """, (

        f"%{keyword}%",
        f"%{keyword}%",
        f"%{keyword}%",
        f"%{keyword}%"

    ))

    rows = cur.fetchall()

    cur.close()
    conn.close()

    result = []

    for row in rows:

        result.append({

            "employee_id": row[0],
            "name": row[1],
            "email": row[2],
            "department": row[3],
            "designation": row[4]

        })

    return jsonify(result)


# -----------------------------------
# Dashboard Data
# -----------------------------------

def dashboard_data():

    conn = get_connection()
    cur = conn.cursor()

    # Total Employees

    cur.execute("""

        SELECT COUNT(*)
        FROM employees

    """)

    total_employees = cur.fetchone()[0]

    # Total Departments

    cur.execute("""

        SELECT COUNT(DISTINCT department)
        FROM employees

    """)

    total_departments = cur.fetchone()[0]

    # Average Salary

    cur.execute("""

        SELECT AVG(salary)
        FROM employees

    """)

    average_salary = cur.fetchone()[0]

    # Recent Employees

    cur.execute("""

        SELECT
            name,
            department,
            designation

        FROM employees

        ORDER BY employee_id DESC

        LIMIT 5

    """)

    rows = cur.fetchall()

    cur.close()
    conn.close()

    recent_employees = []

    for row in rows:

        recent_employees.append({

            "name": row[0],
            "department": row[1],
            "designation": row[2]

        })

    return jsonify({

        "total_employees": total_employees,
        "total_departments": total_departments,
        "average_salary": round(average_salary, 2) if average_salary else 0,
        "recent_employees": recent_employees

    })