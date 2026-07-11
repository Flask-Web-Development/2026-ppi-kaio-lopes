from flask import Blueprint, request, jsonify


from .db import get_db


bp = Blueprint('garage', __name__, url_prefix='/garage')

@bp.route('/view',  methods=['POST'])
def view():
    data = request.get_json()

    userId = data.get('userId')

    db = get_db()

    tanks = db.execute(
        """
        SELECT id, owner_id, tankname, tankimg, tankdescription  
        FROM tank
        WHERE owner_id = ?
        """,
        (userId,)
    ).fetchall()

    return jsonify([dict(tank) for tank in tanks])