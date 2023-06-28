from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy() 

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

class Country(db.Model):
    __tablename__ = 'country'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True)
    zone = db.Column(db.String(100), db.ForeignKey('region.name'))

    def __init__(self, name, zone):
        self.name = name
        self.zone = zone

    def __repr__(self):
        return '<Country {}>'.format(self.name)

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

class Subject(db.Model):
    __tablename__= 'subject'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True)
    topics = db.relationship('Topic', backref='subject')
    curriculum_name = db.Column(db.String(100), db.ForeignKey('curriculum.name'))

    def __init__(self, name, curriculum_name, country_name):
        self.name = name
        self.curriculum_name = curriculum_name
        self.country_name = country_name
        
    def __repr__(self):
        return '<Subject {}>'.format(self.name)
    
class Topic(db.Model):
    __tablename__ = 'topic'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True)
    content = db.Column(db.Text)
    subject_id = db.Column(db.Integer, db.ForeignKey('subject.id'))

    def __init__(self, name, subject_id):
        self.name = name
        self.subject_id = subject_id

    def __repr__(self):
        return '<Topic ()>'.format(self.name)