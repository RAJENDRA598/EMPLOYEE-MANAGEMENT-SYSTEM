from database import get_connection


def create_tables():

    conn = get_connection()
    cur = conn.cursor()

    # -----------------------------
    # Users Table
    # -----------------------------

    cur.execute("""

        CREATE TABLE IF NOT EXISTS users(

            user_id SERIAL PRIMARY KEY,

            username VARCHAR(100) NOT NULL,

            email VARCHAR(150) UNIQUE NOT NULL,

            password TEXT NOT NULL

        );

    """)

    # -----------------------------
    # Employees Table
    # -----------------------------

    cur.execute("""

        CREATE TABLE IF NOT EXISTS employees(

            employee_id SERIAL PRIMARY KEY,

            name VARCHAR(100) NOT NULL,

            email VARCHAR(150) UNIQUE NOT NULL,

            phone VARCHAR(20),

            department VARCHAR(100),

            designation VARCHAR(100),

            salary NUMERIC(10,2),

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

        );

    """)

    # -----------------------------
    # Leave Table
    # -----------------------------

    cur.execute("""

    CREATE TABLE IF NOT EXISTS leaves(

        leave_id SERIAL PRIMARY KEY,

        employee_id INT REFERENCES employees(employee_id),

        reason TEXT NOT NULL,

        leave_date DATE NOT NULL,

        status VARCHAR(20) DEFAULT 'Pending'
        CHECK(status IN ('Pending','Approved','Rejected'))

    );

    """)
    
       # -----------------------------
    # Attendance Table
    # -----------------------------

    cur.execute("""

        CREATE TABLE IF NOT EXISTS attendance(

            attendance_id SERIAL PRIMARY KEY,

            employee_id INT REFERENCES employees(employee_id),

            attendance_date DATE NOT NULL,

            employee_status VARCHAR(20) DEFAULT 'Present',

            hr_status VARCHAR(20) DEFAULT 'Pending',

            final_status VARCHAR(20) DEFAULT 'Pending',

            verified_by VARCHAR(100),

            verified_at TIMESTAMP

        );

    """)


    # -----------------------------
    # Performance Table
    # -----------------------------

    cur.execute("""

        CREATE TABLE IF NOT EXISTS performance(

            performance_id SERIAL PRIMARY KEY,

            employee_id INT REFERENCES employees(employee_id),

            rating VARCHAR(20),

            review TEXT,

            review_date DATE DEFAULT CURRENT_DATE

        );

    """)

    # -----------------------------
    # Resume Table
    # -----------------------------

    cur.execute("""

        CREATE TABLE IF NOT EXISTS resumes(

            resume_id SERIAL PRIMARY KEY,

            employee_id INT REFERENCES employees(employee_id),

            qualification VARCHAR(100),

            skills TEXT,

            experience VARCHAR(100),

            resume_file VARCHAR(255) UNIQUE,

            created_at DATE DEFAULT CURRENT_DATE

        );

    """)

    conn.commit()

    cur.close()
    conn.close()


if __name__ == "__main__":

    create_tables()

    print("All Tables Created Successfully")