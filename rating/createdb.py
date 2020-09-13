import sqlite3
from sqlite3 import Error
import os

# The initialization of the database#
def init_db():
    # If it already exists delete it#
    if os.path.isfile('rating.db'):
        os.remove('rating.db')

    # Create the database and return a pointer to it#
    try:
        conn = sqlite3.connect('rating.db')
    except Error as e:
        print(e)
    return conn


# The engine#

conn = init_db()

# The query executor#
cursor = conn.cursor()

# Create the table#
# Append all the params with a ',' between them#
query = 'CREATE TABLE Algebra (username TEXT PRIMARY KEY,rating INT NOT NULL); '
cursor.execute(query)

# Insert values into the table#
params = ('varennik', 10)
cursor.execute("INSERT INTO Algebra VALUES (?,?);", params)


# Commit the changes to the database#
conn.commit()