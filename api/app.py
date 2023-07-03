from flask import request, jsonify
from flask_cors import CORS
from . import *

app = create_app()

cors = CORS()
cors.init_app(app)

@app.get('/api/regions', strict_slashes=False)
def get_regions():
    regions = Region.query.all()
    all_regions = [{'id': region.id, 'name': region.name} for region in regions]
    return jsonify(all_regions)

@app.route('/api/region/<int:id>', strict_slashes=False, methods=['POST', 'GET'])
def get_region(id):
    if request.method == 'POST':
        name = request.json['name']
        id = request.json['id']
        if Region.query.get(id):
            return jsonify({'error': 'id already in use'}), 409
        new_region = Region(name=name)

        db.session.add(new_region)
        db.session.commit()

        return jsonify({'id': new_region.id, 'name': new_region.name})
    
    region = Region.query.get(id)
    if region is None:
        return jsonify({'error': 'Region not found.'}), 404
    return jsonify({'id': region.id,
                    'name': region.name}), 200


@app.get('/api/countries', strict_slashes=False)
def get_countries():
    countries = Country.query.all()
    if countries is None:
        return jsonify({'error': 'Countries not found'}), 404
    countries_list = [{'id': country.id, 'name': country.name} for country in countries]
    return jsonify(countries_list), 200

@app.route('/api/country/<int:id>', strict_slashes=False, methods=['GET', 'POST'])
def get_country(id):
    if request.method=='POST':
        name = request.json['name']
        id = request.json['id']
        if Country.query.get(id):
            return jsonify({'error': 'id already in use'}), 409
        new_country = Country(name=name)

        db.session.add(new_country)
        db.session.commit()
        
    country = Country.query.get(id)
    if country is None:
        return jsonify({'error': 'Country not found'}), 404
    return jsonify({'id': country.id, 'name': country.name}), 200

@app.get('/api/profiles', strict_slashes=False)
def get_students_profile():
    students = Student.query.all()
    curriculums = Curriculum.query.all()
    if students is None:
        return jsonify({'error': 'Students not found'}), 404
    result = []
    for student in students:
        for curriculum in curriculums:
            if student.curriculum_id == curriculum.id:
                result.append({'id': student.id, 
               'firstname': student.firstname, 
               'lastname': student.lastname,
               'email': student.email, 
               'curriculum': curriculum.name})
    return jsonify(result), 200

@app.route('/api/profile/<int:num>', strict_slashes=False, methods=['GET', 'POST'])
def student_profile(num):
    if request.method == 'POST':
        firstname = request.json["firstname"]
        lastname = request.json["lastname"]
        email = request.json["email"]
        password = request.json["password"]

        new_user = Student(firstname, 
                        lastname, 
                        email, password)

        db.session.add(new_user)
        db.session.commit()
        return jsonify({new_user.firstname, new_user.lastname, new_user.email}), 200
    
    student = Student.query.get(num)
    curriculum = Curriculum.query.filter_by(id=student.curriculum_id).first()
    
    if student is None:
        return jsonify({'error': 'Student not found'}), 404
    return jsonify({'firstname': student.firstname, 
                    'lastname': student.lastname, 
                    'email': student.email,
                    'curriculum': curriculum.name,
                    'country': curriculum.country}), 200

@app.put('/profile/edit/<int:id>', strict_slashes=False)
def post_student(id):
    try:
        student = Student.query.get(id)

        firstname = request.json["firstname"]
        lastname = request.json["lastname"]
        email = request.json["email"]

        student.firstname = firstname
        student.lastname = lastname
        student.email = email
        
        return jsonify({'firstname': student.firstname, 
                        'lastname': student.lastname, 
                        'email': student.email}), 200
    except Exception as e:
        return e.message
    

@app.get('/api/curriculums', strict_slashes=False)
def get_curriculums():
    curriculums = Curriculum.query.all()
    countries = Country.query.all()
    curriculum_list = []
    for country in countries:
        for curriculum in curriculums:
            if country.id == curriculum.country_id:
                curriculum_list.append({'id': curriculum.id,
                                    'country': country.name,
                                    'curriculum': curriculum.name})
    return jsonify(curriculum_list)

@app.get('/api/country/<int:id>/curriculums', strict_slashes=False)
def get_curriculums_by_country(id):
    country = Country.query.get(id)
    result = [{'id': curriculum.id, 'curriculum': curriculum.name } for curriculum in country.curriculums]
    return jsonify(result)

@app.get('/api/curriculum/<int:id>', strict_slashes=False)
def get_curriculum(id):
    curriculum = Curriculum.query.get(id)
    country = Country.query.filter_by(id=curriculum.country_id).first()
    if curriculum is None:
        return jsonify({'error': 'Curriculum not found'}), 404
    return jsonify({'id': curriculum.id, 
                    'curriculum': curriculum.name,
                    'country': country.name})

@app.get('/api/curriculum/<int:id>/subjects', strict_slashes=False)
def get_subjects(id):
    subjects = Subject.query.filter_by(curriculum_id=id).all()
    if subjects is None:
        return jsonify({'error': 'Subjects not found'}), 404
    all_subjects = [{'id': subject.id, 
                     'name': subject.name} 
                     for subject in subjects]
    return jsonify(all_subjects), 200
    

@app.get('/api/curriculum/<int:id>/subject/<int:num>', strict_slashes=False)
def get_subject(id, num):
    curriculum = Curriculum.query.get(id)
    subjects = curriculum.subjects
    num = num - 1
    if subjects[num] is None:
        return jsonify({'error': 'Subject not found'}), 404
    return jsonify({'id': subjects[num].id, 
                    'name': subjects[num].name}), 200

@app.get('/api/curriculum/<int:id>/subject/<int:num>/topics', strict_slashes=False)
def get_topics(id, num):
    curriculum = Curriculum.query.get(id)
    subject = Subject.query.get(num)
    
    if subject.curriculum_id != curriculum.id:
        return jsonify({
            'error': 'Subject not specified'
        }), 404
    
    topics = Topic.query.filter_by(subject_id=num).all()
    topic_list = [{'id': topic.id, 'topic': topic.name, 'content': topic.content} for topic in topics]
    return jsonify(topic_list), 200

if __name__ == '__main__':
    app.run()