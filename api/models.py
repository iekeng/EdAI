from flask_sqlalchemy import SQLAlchemy

# from flask_migrate import Migrate

db = SQLAlchemy()
# migrate = Migrate()

class Region(db.Model):
    __tablename__ = 'region'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    # students = db.relationship('Student', backref='region')
    countries = db.relationship('Country', backref='region')
    # curriculums = db.relationship('Curriculum', backref='region')
    
    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<Region {}>'.format(self.name)

class Country(db.Model):
    __tablename__ = 'country'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True)
    region_id = db.Column(db.Integer, db.ForeignKey('region.id'))
    curriculums = db.relationship('Curriculum', backref='country')
    # subjects = db.relationship('Subject', backref='country')

    def __init__(self, name, region_id):
        self.region_id = region_id
        self.name = name

    def __repr__(self):
        return '<Country {}>'.format(self.name)

class Curriculum(db.Model):
    __tablename__ = 'curriculum'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    country_id = db.Column(db.Integer, db.ForeignKey('country.id'))
    students = db.relationship('Student', backref=('curriculum'))
    subjects = db.relationship('Subject', backref='curriculum')

    def __init__(self, name, country_id):
        self.name = name
        self.country_id = country_id

    def __repr__(self):
        return '<Curriculum {}>'.format(self.name)

class Subject(db.Model):
    __tablename__= 'subject'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    topics = db.relationship('Topic', backref='subject')
    curriculum_id = db.Column(db.Integer, db.ForeignKey('curriculum.id'))
    # country_id = db.Column(db.Integer, db.ForeignKey('country.id'))

    def __init__(self, name, curriculum_id):
        self.name = name
        self.curriculum_id = curriculum_id
        
    def __repr__(self):
        return '<Subject {}>'.format(self.name)
    
class Topic(db.Model):
    __tablename__ = 'topic'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    content = db.Column(db.Text)
    # curriculum_id = db.Column(db.Integer, db.ForeignKey('curriculum.id'))
    subject_id = db.Column(db.Integer, db.ForeignKey('subject.id'))

    def __init__(self, name, subject_id, content):
        self.name = name
        self.subject_id = subject_id
        self.content = content

    def __repr__(self):
        return '<Topic ()>'.format(self.name)

class Student(db.Model):
    __tablename__ = 'student'

    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(45), nullable=False)
    lastname = db.Column(db.String(45), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(45), nullable=False)
    # region_id = db.Column(db.Integer, db.ForeignKey('region.id'))
    curriculum_id = db.Column(db.Integer, db.ForeignKey('curriculum.id'))

    def __init__(self, firstname, lastname, email, password, curriculum_id):
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.password = password
        self.curriculum_id = curriculum_id

    def __repr__(self):
        return '<Student {} {}>'.format(self.firstname, self.lastname)
    
    @property
    def rolenames(self):
       return 'Student'

    @classmethod
    def lookup(cls, email):
        return cls.query.filter_by(email=email).one_or_none()

    @classmethod
    def identify(cls, id):
        return cls.query.get(id)

    @property
    def identity(self):
        return self.id