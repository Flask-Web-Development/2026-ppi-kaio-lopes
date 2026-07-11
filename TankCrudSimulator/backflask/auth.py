from flask import Blueprint, request, jsonify


from .db import get_db


bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    db = get_db()

    db.execute(
        """
        INSERT INTO user (username, password)
        VALUES (?, ?)
        """,
        (username, password)
    )

    db.commit()

    return jsonify({
        "created": True
    })

@bp.route('/login', methods=['POST'])
def login():

    data = request.get_json()

    username = data.get('username')
    password = data.get('password')

    db = get_db()

    user = db.execute(
        """
        SELECT *
        FROM user
        WHERE username = ?
        AND password = ?
        """,
        (username, password)
    ).fetchone()

    return jsonify({
        "userLoggedIn": user is not None,
        "userId": user["id"],
    })