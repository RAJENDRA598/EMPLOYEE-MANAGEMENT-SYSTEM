from flask import jsonify

from database import get_connection


# -----------------------------------
# Dashboard Details
# -----------------------------------

def dashboard():

    conn = get_connection()
    cur = conn.cursor()

    # -----------------------------------
    # Total Employees
    # -----------------------------------

    cur.execute("""

        SELECT COUNT(*)
        FROM employees

    """)

    total_employees = cur.fetchone()[0]

    # -----------------------------------
    # Total Departments
    # -----------------------------------

    cur.execute("""

        SELECT COUNT(DISTINCT department)
        FROM employees

    """)

    total_departments = cur.fetchone()[0]

    # -----------------------------------
    # Average Salary
    # -----------------------------------

    cur.execute("""

        SELECT COALESCE(AVG(salary), 0)
        FROM employees

    """)

    average_salary = float(cur.fetchone()[0])

    # -----------------------------------
    # Recent Employees
    # -----------------------------------

    cur.execute("""

        SELECT
            employee_id,
            name,
            department,
            designation

        FROM employees

        ORDER BY employee_id DESC

        LIMIT 5

    """)

    rows = cur.fetchall()

    recent_employees = []

    for row in rows:

        recent_employees.append({

            "employee_id": row[0],
            "name": row[1],
            "department": row[2],
            "designation": row[3]

        })

    cur.close()
    conn.close()

    return jsonify({

        "total_employees": total_employees,
        "total_departments": total_departments,
        "average_salary": round(average_salary, 2),
        "recent_employees": recent_employees

    })