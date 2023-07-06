import os, openai
from flask import request, jsonify, Blueprint
# from flask_praetorian import Praetorian, auth_required
from dotenv import load_dotenv, find_dotenv
from flask_cors import CORS
from . import *

load_dotenv(find_dotenv())

app = create_app()
cors = CORS()
# guard = Praetorian()

cors.init_app(app)
# guard.init_app(app, Student)

openai.api_key = os.environ['OPENAI_API_KEY']

# @app.post('/api/auth/register', strict_slashes=False)
# def register_student():
#     firstname = request.json['firstname']
#     lastname = request.json['lastname']
#     email = request.json['email']
#     pwd = request.json['password']

#     password = guard.hash_password(pwd)

#     new_student = Student(firstname, lastname, email, password, 1)

#     db.session.add(new_student)
#     db.session.commit()

# @app.post('/api/auth/login',  strict_slashes=False)
# def login_student():
#     email = request.json['email']
#     password = request.json['password']

#     student = guard.authenticate(email, password)
#     access_token = guard.encode_jwt_token(student)
#     refresh_token = guard.encode_jwt_refresh_token(student)

#     return jsonify({'access_token': access_token,
#                     'refresh_token': refresh_token})

#     return jsonify({'feedback': 'User registered successfully'})

@main.route('/chatbot', strict_slashes=False)
def chatbot(model="gpt-3.5-turbo"):
    messages = [
        {"role": "system", "content": system_message}
    ]
    prompt = request.json['prompt']
    new_message = {"role": "user", "content": prompt}
    messages.append(new_message)

    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=0.2,
    )
    result = response.choices[0].message["content"]
    return jsonify({"message": result})

@main.route('/regions', strict_slashes=False)
def get_regions():
    regions = Region.query.all()
    all_regions = [{'id': region.id, 'name': region.name} for region in regions]
    return jsonify(all_regions)

@main.route('/region/<int:id>', strict_slashes=False, methods=['POST', 'GET'])
def get_region(id):
    if request.method == 'POST':
        name = request.json['name']
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


@main.get('/countries', strict_slashes=False)
def get_countries():
    countries = Country.query.all()
    if countries is None:
        return jsonify({'error': 'Countries not found'}), 404
    countries_list = [{'id': country.id, 'name': country.name} for country in countries]
    return jsonify(countries_list), 200

@main.route('/country/<int:id>', strict_slashes=False, methods=['GET', 'POST'])
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

@main.route('/profiles', strict_slashes=False)
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

@main.route('/profile/<int:id>', strict_slashes=False, methods=['GET', 'POST'])
def student_profile(id):
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
    
    student = Student.query.get(id)
    if student is None:
        return jsonify({'error': 'Student not found'}), 404
    curriculum = Curriculum.query.filter_by(id=student.curriculum_id).first()
    country = Country.query.filter_by(id=curriculum.country_id).first()
   
    return jsonify({'firstname': student.firstname, 
                    'lastname': student.lastname, 
                    'email': student.email,
                    'curriculum': curriculum.name,
                    'country': country.name}), 200
#
@main.put('/profile/edit/<int:id>', strict_slashes=False)
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

@main.get('/curriculums', strict_slashes=False)
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

@main.get('/country/<int:id>/curriculums', strict_slashes=False)
def get_curriculums_by_country(id):
    country = Country.query.get(id)
    result = [{'id': curriculum.id, 'curriculum': curriculum.name } for curriculum in country.curriculums]
    return jsonify(result)

@main.get('/country/<int:id>/curriculum/<int:num>', strict_slashes=False)
def get_curriculum_by_country(id, num):
    country = Country.query.get(id)
    for curriculum in country.curriculums:
        if curriculum.id == num:
            result = {'id': curriculum.id, 'curriculum': curriculum.name } 
    return jsonify(result)

@main.get('/country/<int:id>/curriculum/<int:num>/subjects', strict_slashes=False)
def get_curriculum_subjects(id, num):
    curriculum = Curriculum.query.get(num)
    if curriculum.country_id != id:
        return jsonify({'error': 'Curriculum not specified'}), 404
    subjects = Subject.query.filter_by(curriculum_id=num).all()
    all_subjects = [{'id': subject.id, 
                     'name': subject.name} 
                     for subject in subjects]
    return jsonify(all_subjects), 200

@main.get('/curriculum/<int:id>', strict_slashes=False)
def get_curriculum(id):
    curriculum = Curriculum.query.get(id)
    if curriculum is None:
        return jsonify({'error': 'Curriculum not found'}), 404
    country = Country.query.filter_by(id=curriculum.country_id).first()
    return jsonify({'id': curriculum.id, 
                    'curriculum': curriculum.name,
                    'country': country.name})

# @main.get('/curriculum/<int:id>/subjects', strict_slashes=False)
# def get_subjects(id):
#     subjects = Subject.query.filter_by(curriculum_id=id).all()
#     if subjects is None:
#         return jsonify({'error': 'Subjects not found'}), 404
#     all_subjects = [{'id': subject.id, 
#                      'name': subject.name} 
#                      for subject in subjects]
#     return jsonify(all_subjects), 200
    

# @main.get('/curriculum/<int:id>/subject/<int:num>', strict_slashes=False)
# def get_subject(id, num):
#     curriculum = Curriculum.query.get(id)
#     subjects = curriculum.subjects
#     num = num - 1
#     if subjects[num] is None:
#         return jsonify({'error': 'Subject not found'}), 404
#     return jsonify({'id': subjects[num].id, 
#                     'name': subjects[num].name}), 200

@app.get('/country/<int:id>/curriculum/<int:num>/subject/<int:var>/topics', strict_slashes=False)
def get_topics(id, num, var):
    country = Country.query.get(id)
    curriculum = Curriculum.query.get(num)
    subject = Subject.query.get(var)

    if curriculum in country.curriculums:
        if subject in curriculum.subjects:
            topics = [{'id': topic.id, 
            'topic': topic.name, 
            'content': topic.content}for topic in subject.topics]
            return jsonify(topics)
    return {'error': 'Subject not specified'}, 400

    # for curriculum in country.curriculums:
    #     if curriculum.id == num and subject.curriculum_id == num:
        
    #     return jsonify({'error': 'Curriculum not specified'})
    
    #     if subject.curriculum_id != curriculum.id 
    #     return jsonify({
    #         'error': 'Subject not specified' 
    #     }), 404
    
    # topics = Topic.query.filter_by(subject_id=num).all()
    # topic_list = [{'id': topic.id, 'topic': topic.name, 'content': topic.content} for topic in topics]
    # return jsonify(topic_list), 200

app.register_blueprint(main, url_prefix='/api')

if __name__ == '__main__':
    app.run()