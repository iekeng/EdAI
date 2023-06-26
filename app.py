import openai, os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#init db
db = SQLAlchemy(app) 

ma = Marshmallow(app)

class Region(db.Model):
    __tablename__ = 'region'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    students = db.relationship('Student', backref='region')
    countries = db.relationship('Country', backref='region')
    curriculums = db.relationship('Curriculum', backref='region')
    
    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<Region {}>'.format(self.name)
    

class RegionSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name')

region_schema = RegionSchema()
regions_schema = RegionSchema(many=True)

class Student(db.Model):
    __tablename__ = 'student'
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(45), nullable=False)
    lastname = db.Column(db.String(45), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(45), nullable=False)
    region_id = db.Column(db.Integer, db.ForeignKey('region.id'))

    def __init__(self, region_id, firstname, lastname, email, password):
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.region_id = region_id
        self.password = password

    def __repr__(self):
        return '<Student {} {}>'.format(self.firstname, self.lastname)
    
#define studentschema
class StudentSchema(ma.Schema):
    class Meta:
        fields = ('id', 'firstname', 'lastname', 'email', 'region_id')

#init studentschema
student_schema = StudentSchema()
students_schema = StudentSchema(many=True)

class Country(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True)
    zone = db.Column(db.String(100), db.ForeignKey('region.name'))

    def __init__(self, name, zone):
        self.name = name
        self.zone = zone

    def __repr__(self):
        return '<Country {}>'.format(self.name)

class CountrySchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'zone')

country_schema = CountrySchema()
countries_schema = CountrySchema(many=True)

class Curriculum(db.Model):
    __tablename__ = 'curriculum'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), unique=True)
    region_id = db.Column(db.Integer, db.ForeignKey('region.id'))

    def __init__(self, name, region_id):
        self.name = name
        self.region_id = region_id

    def __repr__(self):
        return '<Curriculum {}>'.format(self.name)

class CurriculumSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name')

# class Subject(db.Model):
#     __tablename__= 'subject'
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(255), unique=True)
#     content = db.Column(db.Text)
#     curriculum_name = db.Column(db.Integer, db.ForeignKey('curriculum.name'))

#     def __init__(self, name, curriculum_name, country_name):
#         self.name = name
#         self.curriculum_name = curriculum_name
#         self.country_name = country_name
        
#     def __repr__(self):
#         return '<Subject {}>'.format(self.name)
    
# class SubjectSchema(ma.Schema):
#     class Meta:
#         fields = ('id','curriculum_name', 'name', 'content')

@app.get('/countries', strict_slashes=False)
def get_countries():
    countries = Country.query.all()
    results = countries_schema.dump(countries)
    return jsonify(results)



@app.get('/regions', strict_slashes=False)
def get_regions():
    regions = Region.query.all()
    result = regions_schema.dump(regions)
    return jsonify(result)

@app.route('/region/<int:id>', strict_slashes=False, methods=['POST', 'GET'])
def get_region(id):
    region = Region.query.get(id)
    if request.method == 'POST':
        name = request.json['name']
        new_region = Region(name)

        db.session.add(new_region)
        db.session.commit()

        return region_schema.jsonify(new_region)
    return region_schema.jsonify(region)

    
@app.get('/profiles', strict_slashes=False)
def students():
    users = Student.query.all()
    result = students_schema.dump(users)
    return jsonify(result)

@app.post('/profile/<int:id>', strict_slashes=False)
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


@app.get('/profile/<int:id>', strict_slashes=False)
def student_profile(id):
    user = Student.query.get(id)
    result = student_schema.dump(user)
    return jsonify(result)

@app.put('/profile/edit/<int:id>', strict_slashes=False)
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

if __name__ == '__main__':
    app.run(debug=True)
