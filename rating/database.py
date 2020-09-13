import sqlite3
from sqlite3 import Error
import os
import sys


# The initialization of the database#
def init_db():
    # return a pointer to the database#
    try:
        conn = sqlite3.connect('rating.db')
    except Error as e:
        print(e)
    return conn


# The engine#
conn = init_db()

# The query executor#
cursor = conn.cursor()


# Insert a user into the table#
def insert_user(user, table):
    params = (user, 0)
    cursor.execute("INSERT INTO " + table + " VALUES (?,?);", params)


# Increase a rating of a user#
def increase_user(user, table):
    cursor.execute("SELECT rating FROM " + table + " WHERE username = ?;",(user,))
    score = cursor.fetchall()
    res = score[0][0]
    res = res + 1
    print(res)
    params = (res, user)
    cursor.execute("UPDATE " + table + " SET rating=? WHERE username=?;", params)


# Increase a rating of a user#
def decrease_user(user, table):
    cursor.execute("SELECT rating FROM " + table + " WHERE username = ?;",(user,))
    score = cursor.fetchall()
    res = score[0][0]
    res = res - 1
    print(res)
    params = (res, user)
    cursor.execute("UPDATE " + table + " SET rating=? WHERE username=?;", params)


# Commit the changes to the database#
conn.commit()
