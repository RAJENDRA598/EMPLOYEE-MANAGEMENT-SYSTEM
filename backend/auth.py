import jwt
import datetime

from flask import request, jsonify

from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)

from database import get_connection



SECRET_KEY = "employee_secret_key"





# -----------------------------------
# Register User
# -----------------------------------

def register_user():

    data = request.get_json()


    username = data.get("username")

    email = data.get("email")

    password = data.get("password")

    role = data.get("role")



    if not username or not email or not password or not role:

        return jsonify({

            "message":
            "All fields are required"

        }),400




    conn = get_connection()

    cur = conn.cursor()



    cur.execute("""

        SELECT *

        FROM users

        WHERE email=%s

    """,

    (email,))



    user = cur.fetchone()



    if user:


        cur.close()

        conn.close()


        return jsonify({

            "message":
            "Email already exists"

        }),400






    hashed_password = generate_password_hash(
        password
    )



    cur.execute("""

        INSERT INTO users

        (

            username,

            email,

            password,

            role

        )

        VALUES

        (

            %s,

            %s,

            %s,

            %s

        )

    """,

    (

        username,

        email,

        hashed_password,

        role

    ))



    conn.commit()


    cur.close()

    conn.close()



    return jsonify({

        "message":
        "Registration Successful"

    }),201







# -----------------------------------
# Login User
# -----------------------------------

def login_user():


    data = request.get_json()



    email = data.get("email")

    password = data.get("password")




    conn = get_connection()

    cur = conn.cursor()



    cur.execute("""

        SELECT *

        FROM users

        WHERE email=%s

    """,

    (email,))



    user = cur.fetchone()



    cur.close()

    conn.close()





    if user is None:


        return jsonify({

            "message":
            "Invalid Email"

        }),401





    if not check_password_hash(

        user[3],

        password

    ):


        return jsonify({

            "message":
            "Invalid Password"

        }),401







    employee_id = None



    # If user is Employee,
    # get employee table id

    if user[4] == "Employee":


        conn = get_connection()

        cur = conn.cursor()



        cur.execute("""

            SELECT employee_id

            FROM employees

            WHERE email=%s

        """,

        (email,))



        employee = cur.fetchone()



        cur.close()

        conn.close()



        if employee:

            employee_id = employee[0]



    token = jwt.encode({

        "user_id": user[0],

        "role": user[4],

        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)

    },

    SECRET_KEY,

    algorithm="HS256"

    )








    return jsonify({

        "message":
        "Login Successful",


        "token":
        token,


        "username":
        user[1],


        "email":
        user[2],


        "role":
        user[4],


        "employee_id":
        employee_id


    })









# -----------------------------------
# Change Password
# -----------------------------------

def change_password():


    data = request.get_json()



    email = data.get("email")

    current_password = data.get("current_password")

    new_password = data.get("new_password")






    conn = get_connection()

    cur = conn.cursor()





    cur.execute("""

        SELECT *

        FROM users

        WHERE email=%s


    """,

    (email,))



    user = cur.fetchone()





    if user is None:


        cur.close()

        conn.close()


        return jsonify({

            "message":
            "User not found"

        }),404





    if not check_password_hash(

        user[3],

        current_password

    ):


        cur.close()

        conn.close()



        return jsonify({

            "message":
            "User not found"

        }),404






    new_hash = generate_password_hash(
        new_password
    )






    cur.execute("""

        UPDATE users

        SET password=%s

        WHERE email=%s


    """,

    (

        new_hash,

        email

    ))





    conn.commit()


    cur.close()

    conn.close()





    return jsonify({

        "message":
        "Password changed successfully"

    })




# -----------------------------------
# Forgot Password
# -----------------------------------

def forgot_password():


    data = request.get_json()



    email = data.get("email")

    new_password = data.get("new_password")






    conn = get_connection()

    cur = conn.cursor()





    cur.execute("""

        SELECT *

        FROM users

        WHERE email=%s


    """,

    (email,))



    user = cur.fetchone()





    if user is None:


        cur.close()

        conn.close()


        return jsonify({

            "message":
            "Current password is incorrect"

        }),400






    new_hash = generate_password_hash(
        new_password
    )






    cur.execute("""

        UPDATE users

        SET password=%s

        WHERE email=%s


    """,

    (

        new_hash,

        email

    ))





    conn.commit()


    cur.close()

    conn.close()





    return jsonify({

        "message":
        "Password reset successfully"

    })