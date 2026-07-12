import jwt

from functools import wraps
from flask import request, jsonify, g


SECRET_KEY = "employee_secret_key"



# -----------------------------------
# JWT Token Verification
# -----------------------------------

def token_required(function):

    @wraps(function)

    def wrapper(*args, **kwargs):


        token = request.headers.get("Authorization")


        if not token:

            return jsonify({

                "message":
                "Token is missing"

            }),401



        try:

            token = token.replace(
                "Bearer ",
                ""
            )


            decoded_token = jwt.decode(

                token,

                SECRET_KEY,

                algorithms=["HS256"]

            )


            g.user_id = decoded_token.get(
                "user_id"
            )


            g.role = decoded_token.get(
                "role"
            )



        except jwt.ExpiredSignatureError:


            return jsonify({

                "message":
                "Token expired"

            }),401



        except Exception:


            return jsonify({

                "message":
                "Invalid Token"

            }),401





        return function(*args, **kwargs)



    return wrapper







# -----------------------------------
# Role Based Access
# -----------------------------------

def role_required(allowed_roles):


    def decorator(function):


        @wraps(function)

        def wrapper(*args, **kwargs):


            if g.role not in allowed_roles:


                return jsonify({

                    "message":
                    "Access Denied"

                }),403





            return function(*args, **kwargs)



        return wrapper



    return decorator