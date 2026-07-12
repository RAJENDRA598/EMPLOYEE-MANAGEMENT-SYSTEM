from flask import request, jsonify

from database import get_connection



# -------------------------
# Add Performance
# -------------------------

def add_performance():

    data = request.get_json()


    employee_id = data.get("employee_id")
    rating = data.get("rating")
    review = data.get("review")


    if not employee_id or not rating or not review:

        return jsonify({

            "message":
            "All fields are required"

        }),400



    conn = get_connection()

    cur = conn.cursor()



    # Check employee exists

    cur.execute("""

        SELECT employee_id

        FROM employees

        WHERE employee_id=%s

    """,

    (employee_id,))



    employee = cur.fetchone()



    if employee is None:

        cur.close()

        conn.close()


        return jsonify({

            "message":
            "Employee ID not found"

        }),404





    cur.execute("""

        INSERT INTO performance

        (

            employee_id,

            rating,

            review

        )


        VALUES

        (

            %s,

            %s,

            %s

        )


    """,

    (

        employee_id,

        rating,

        review

    ))



    conn.commit()


    cur.close()

    conn.close()



    return jsonify({

        "message":
        "Performance Added Successfully"

    })





# -------------------------
# Get All Performance
# -------------------------

def get_performance():


    conn = get_connection()

    cur = conn.cursor()



    cur.execute("""

        SELECT

            performance_id,

            employee_id,

            rating,

            review,

            review_date


        FROM performance


        ORDER BY performance_id DESC


    """)



    rows = cur.fetchall()



    cur.close()

    conn.close()



    result = []



    for row in rows:


        result.append({

            "performance_id": row[0],

            "employee_id": row[1],

            "rating": row[2],

            "review": row[3],

            "review_date": str(row[4])

        })



    return jsonify(result)







# -------------------------
# Update Performance
# -------------------------

def update_performance(performance_id):


    data = request.get_json()



    rating = data.get("rating")

    review = data.get("review")



    conn = get_connection()

    cur = conn.cursor()



    cur.execute("""

        UPDATE performance

        SET

            rating=%s,

            review=%s


        WHERE performance_id=%s


    """,

    (

        rating,

        review,

        performance_id

    ))



    conn.commit()



    cur.close()

    conn.close()



    return jsonify({

        "message":
        "Performance Updated Successfully"

    })







# -------------------------
# Delete Performance
# -------------------------

def delete_performance(performance_id):


    conn = get_connection()

    cur = conn.cursor()



    cur.execute("""

        DELETE FROM performance

        WHERE performance_id=%s


    """,

    (

        performance_id,

    ))



    conn.commit()



    cur.close()

    conn.close()



    return jsonify({

        "message":
        "Performance Deleted Successfully"

    })