from flask import request, jsonify
from database import get_connection
from werkzeug.utils import secure_filename

import os
import time


ALLOWED_EXTENSIONS = {"pdf"}




def allowed_file(filename):

    return "." in filename and \
           filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS






# --------------------------------
# Upload Resume
# --------------------------------

def add_resume():


    employee_id = request.form["employee_id"]

    qualification = request.form["qualification"]

    skills = request.form["skills"]

    experience = request.form["experience"]



    if "resume" not in request.files:


        return jsonify({

            "message":
            "Please select a PDF file"

        }),400





    file = request.files["resume"]



    if file.filename == "":


        return jsonify({

            "message":
            "Please select a PDF file"

        }),400





    if not allowed_file(file.filename):


        return jsonify({

            "message":
            "Only PDF files are allowed"

        }),400






    conn = get_connection()

    cur = conn.cursor()




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






    filename = (

        str(employee_id)

        + "_"

        + str(int(time.time()))

        + "_"

        + secure_filename(file.filename)

    )



    filepath = os.path.join(

        "uploads/resumes",

        filename

    )



    file.save(filepath)






    cur.execute("""

        INSERT INTO resumes

        (

            employee_id,

            qualification,

            skills,

            experience,

            resume_file

        )


        VALUES

        (%s,%s,%s,%s,%s)


    """,

    (

        employee_id,

        qualification,

        skills,

        experience,

        filename

    ))





    conn.commit()


    cur.close()

    conn.close()



    return jsonify({

        "message":
        "Resume Uploaded Successfully"

    })









# --------------------------------
# Get Resumes
# --------------------------------

def get_resumes():


    conn = get_connection()

    cur = conn.cursor()



    cur.execute("""

        SELECT

            resume_id,

            employee_id,

            qualification,

            skills,

            experience,

            resume_file,

            created_at


        FROM resumes


        ORDER BY resume_id DESC


    """)



    rows = cur.fetchall()



    cur.close()

    conn.close()



    result = []




    for row in rows:


        result.append({


            "resume_id": row[0],

            "employee_id": row[1],

            "qualification": row[2],

            "skills": row[3],

            "experience": row[4],

            "resume_file": row[5],

            "created_at": str(row[6])


        })



    return jsonify(result)









# --------------------------------
# Update Resume Details
# --------------------------------

def update_resume(id):


    data = request.get_json()



    qualification = data.get("qualification")

    skills = data.get("skills")

    experience = data.get("experience")




    conn = get_connection()

    cur = conn.cursor()





    cur.execute("""

        UPDATE resumes

        SET

            qualification=%s,

            skills=%s,

            experience=%s


        WHERE resume_id=%s


    """,

    (

        qualification,

        skills,

        experience,

        id

    ))





    conn.commit()



    cur.close()

    conn.close()




    return jsonify({

        "message":
        "Resume Updated Successfully"

    })









# --------------------------------
# Delete Resume
# --------------------------------

def delete_resume(id):


    conn = get_connection()

    cur = conn.cursor()





    cur.execute("""

        SELECT resume_file

        FROM resumes

        WHERE resume_id=%s


    """,

    (id,))



    row = cur.fetchone()




    if row:


        filepath = os.path.join(

            "uploads/resumes",

            row[0]

        )



        if os.path.exists(filepath):

            os.remove(filepath)







    cur.execute("""

        DELETE FROM resumes

        WHERE resume_id=%s


    """,

    (id,))





    conn.commit()



    cur.close()

    conn.close()




    return jsonify({

        "message":
        "Resume Deleted Successfully"

    })