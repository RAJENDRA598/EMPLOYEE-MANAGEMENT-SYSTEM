from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS
from werkzeug.exceptions import RequestEntityTooLarge

import os


from create_tables import create_tables


from auth import (
    register_user,
    login_user,
    change_password
)


from employee import (
    add_employee,
    get_employees,
    get_employee,
    update_employee,
    delete_employee,
    search_employee,
    dashboard_data
)


from leave import (
    apply_leave,
    get_leaves,
    update_leave,
    delete_leave
)


from attendance import (
    save_attendance,
    get_attendance,
    update_attendance,
    delete_attendance,
    finalize_attendance
)

from resume import (
    add_resume,
    get_resumes,
    update_resume,
    delete_resume
)


from performance import (
    add_performance,
    get_performance,
    update_performance,
    delete_performance
)


from middleware import (
    token_required,
    role_required
)





app = Flask(__name__)


CORS(app)



# -----------------------------
# Resume Upload Configuration
# -----------------------------


UPLOAD_FOLDER = "uploads/resumes"


app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


app.config["MAX_CONTENT_LENGTH"] = 5 * 1024 * 1024



os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)



# Create Tables

create_tables()






@app.errorhandler(RequestEntityTooLarge)

def handle_large_file(error):

    return jsonify({

        "message":
        "File size should not exceed 5 MB"

    }),413






@app.route("/")

def home():

    return {

        "message":
        "Employee Management System Backend Running"

    }






# =================================================
# Authentication
# =================================================


@app.route("/register", methods=["POST"])

def register():

    return register_user()





@app.route("/login", methods=["POST"])

def login():

    return login_user()





@app.route("/change_password", methods=["PUT"])

def change_password_route():

    return change_password()







# =================================================
# Dashboard
# =================================================


@app.route("/dashboard", methods=["GET"])

@token_required

def dashboard_route():

    return dashboard_data()







# =================================================
# Employee Management
# =================================================


@app.route("/add_employee", methods=["POST"])

@token_required

@role_required(["HR","Manager"])

def add_employee_route():

    return add_employee()






@app.route("/employees", methods=["GET"])

@token_required

def employees_route():

    return get_employees()






@app.route("/employee/<int:employee_id>", methods=["GET"])

@token_required

def employee_route(employee_id):

    return get_employee(employee_id)







@app.route("/update_employee/<int:employee_id>", methods=["PUT"])

@token_required

@role_required(["HR","Manager"])

def update_employee_route(employee_id):

    return update_employee(employee_id)







@app.route("/delete_employee/<int:employee_id>", methods=["DELETE"])

@token_required

@role_required(["HR"])

def delete_employee_route(employee_id):

    return delete_employee(employee_id)







@app.route("/search_employee", methods=["GET"])

@token_required

def search_employee_route():

    return search_employee()







# =================================================
# Leave Management
# =================================================


@app.route("/apply_leave", methods=["POST"])

@token_required

def apply_leave_route():

    return apply_leave()






@app.route("/leaves", methods=["GET"])

@token_required

def leaves():

    return get_leaves()






@app.route("/update_leave/<int:leave_id>", methods=["PUT"])
@token_required
@role_required(["HR","Manager"])

def update_leave_route(leave_id):

    return update_leave(leave_id)






@app.route("/delete_leave/<int:leave_id>", methods=["DELETE"])

@token_required

@role_required(["HR"])

def delete_leave_route(leave_id):

    return delete_leave(leave_id)







# =================================================
# Attendance Management
# =================================================

@app.route("/attendance", methods=["POST"])
@token_required
def attendance():
    return save_attendance()


@app.route("/attendance", methods=["GET"])
@token_required
def attendance_list():
    return get_attendance()


@app.route("/update_attendance/<int:id>", methods=["PUT"])
@token_required
@role_required(["HR","Manager"])
def update_attendance_route(id):
    return update_attendance(id)


@app.route("/delete_attendance/<int:id>", methods=["DELETE"])
@token_required
@role_required(["HR","Manager"])
def delete_attendance_route(id):
    return delete_attendance(id)


# =================================================
# Finalize Attendance
# =================================================

@app.route("/finalize_attendance", methods=["POST"])
@token_required
@role_required(["HR","Manager"])
def finalize_attendance_route():
    return finalize_attendance()






# =================================================
# Resume Management
# =================================================


@app.route("/resume", methods=["POST"])
@token_required
@role_required(["HR","Manager","Employee"])

def add_resume_route():

    return add_resume()


@app.route("/resume", methods=["GET"])

@token_required

def get_resume_route():

    return get_resumes()






@app.route("/update_resume/<int:id>", methods=["PUT"])
@token_required
@role_required(["HR","Manager"])

def update_resume_route(id):

    return update_resume(id)






@app.route("/resume/<int:id>", methods=["DELETE"])

@token_required

@role_required(["HR","Manager"])

def delete_resume_route(id):

    return delete_resume(id)








@app.route("/resume/<filename>")

def download_resume(filename):

    return send_from_directory(

        app.config["UPLOAD_FOLDER"],

        filename,

        as_attachment=True

    )







# =================================================
# Performance Management
# =================================================


@app.route("/performance", methods=["POST"])

@token_required

@role_required(["HR","Manager"])

def add_performance_route():

    return add_performance()






@app.route("/performance", methods=["GET"])

@token_required

def performance_route():

    return get_performance()






@app.route("/update_performance/<int:id>", methods=["PUT"])

@token_required

@role_required(["HR","Manager"])

def update_performance_route(id):

    return update_performance(id)






@app.route("/performance/<int:id>", methods=["DELETE"])

@token_required

@role_required(["HR","Manager"])

def delete_performance_route(id):

    return delete_performance(id)







if __name__ == "__main__":

    app.run(debug=True)