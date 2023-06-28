import  os
from flask import Flask, request, jsonify
from .models import *
from .schema import *

app = Flask(__name__)
app.debug = False
basedir = os.path.abspath(os.path.dirname(__file__))

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'secret'

db.init_app(app)
ma.init_app(app)

@app.get('/api/countries', strict_slashes=False)
def get_countries():
    countries = Country.query.all()
    results = countries_schema.dump(countries)
    return jsonify(results)

@app.get('/api/regions', strict_slashes=False)
def get_regions():
    regions = Region.query.all()
    result = regions_schema.dump(regions)
    return jsonify(result)

@app.route('/api/region/<int:id>', strict_slashes=False, methods=['POST', 'GET'])
def get_region(id):
    region = Region.query.get(id)
    if request.method == 'POST':
        name = request.json['name']
        new_region = Region(name)

        db.session.add(new_region)
        db.session.commit()

        return region_schema.jsonify(new_region)
    return region_schema.jsonify(region)

@app.get('/api/profiles', strict_slashes=False)
def students():
    users = Student.query.all()
    result = students_schema.dump(users)
    return jsonify(result)

@app.post('/api/profile/<int:id>', strict_slashes=False)
def login_student(id):
    firstname = request.json["firstname"]
    lastname = request.json["lastname"]
    email = request.json["email"]
    password = request.json["password"]
    region_id = request.json["region_id"]

    new_user = Student(region_id, firstname, lastname, email, password)

    db.session.add(new_user)
    db.session.commit()

    return student_schema.jsonify(new_user)


@app.get('/api/profile/<int:id>', strict_slashes=False)
def student_profile(id):
    user = Student.query.get(id)
    result = student_schema.dump(user)
    return jsonify(result)

@app.put('/api/profile/edit/<int:id>', strict_slashes=False)
def post_student(id):
    user = Student.query.get(id)

    firstname = request.json["firstname"]
    lastname = request.json["lastname"]
    email = request.json["email"]
    password = request.json["password"]
    region_id = request.json["region_id"]

    user.firstname = firstname
    user.lastname = lastname
    user.email = email
    user.password = password
    user.region_id = region_id

    return student_schema.jsonify(user)

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run()