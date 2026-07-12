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
        SELECT id, owner_id, tankname, tankimg, tankdescription, tankfrontalarmor, tanksidearmor, tankcannon, tankengine  
        FROM tank
        WHERE owner_id = ?
        """,
        (userId,)
    ).fetchall()

    return jsonify([dict(tank) for tank in tanks])

#Created CRUD
@bp.route('/create', methods=['POST'])
def create():
    data = request.get_json()

    db = get_db()

    db.execute(
        """
        INSERT INTO tank
        (
            owner_id,
            tankname,
            tankimg,
            tankdescription,
            tankfrontalarmor,
            tanksidearmor,
            tankcannon,
            tankengine
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            data["owner_id"],
            data["tankname"],
            data["tankimg"],
            data["tankdescription"],
            data["tankfrontalarmor"],
            data["tanksidearmor"],
            data["tankcannon"],
            data["tankengine"],
        )
    )

    db.commit()

    return {"success": True}

@bp.route('/delete', methods=['DELETE'])
def delete_tank():
    data = request.get_json()

    tank_id = data.get('tankId')
    user_id = data.get('userId')

    db = get_db()

    result = db.execute(
        """
        DELETE FROM tank
        WHERE id = ?
        AND owner_id = ?
        """,
        (tank_id, user_id)
    )

    db.commit()

    return jsonify({
        "success": result.rowcount > 0
    })

#updates tanks already existing
@bp.route('/update', methods=['PUT'])
def update():
    data = request.get_json()

    db = get_db()

    db.execute(
        """
        UPDATE tank
        SET
            tankname = ?,
            tankimg = ?,
            tankdescription = ?,
            tankfrontalarmor = ?,
            tanksidearmor = ?,
            tankcannon = ?,
            tankengine = ?
        WHERE id = ?
        """,
        (
            data["tankname"],
            data["tankimg"],
            data["tankdescription"],
            data["tankfrontalarmor"],
            data["tanksidearmor"],
            data["tankcannon"],
            data["tankengine"],
            data["id"]
        )
    )

    db.commit()

    return jsonify({
        "success": True
    })