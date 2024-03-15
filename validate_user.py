# validate_user.py
import sys

def validate_user(username, password):
    # Add your validation logic here
    # Example: Check if username and password match a record in the database
    if username == 'admin' and password == 'admin123':
        return 'success'
    else:
        return 'failure'

if __name__ == '__main__':
    username = sys.argv[1]
    password = sys.argv[2]
    print(validate_user(username, password))
