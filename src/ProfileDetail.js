import { TextField } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { Button, Dropdown, Modal } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import MultiImageInput from 'react-multiple-image-input';
import * as yup from "yup"

const ProfileDetail = () => {
    const crop = {
        unit: '%',
        aspect: 4 / 3,
        width: '100'
    };

    const [startDate, setStartDate] = useState(new Date());
    const [data, setData] = useState([]);
    const [updateData, setupdateData] = useState(null);
    const [edit, setEdit] = useState(false)
    const [index, setIndex] = useState(null);
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState('');
    const [images, setImages] = useState({});

    const handleClose = () => {
        setShow(false);
        setupdateData(null);
        setEdit(false);
    };

    const handleShow = () => setShow(true);

    const filteredData = data.filter((profile) =>
        profile.name.toLowerCase().includes(search.toLowerCase()) ||
        profile.email.toLowerCase().includes(search.toLowerCase()) ||
        profile.phoneno.includes(search) ||
        profile.gender.toLowerCase().includes(search.toLowerCase()) ||
        profile.language.toLowerCase().includes(search.toLowerCase())
    );

    const validationSchema = yup.object({
        name: yup.string().required("Name is required"),
        email: yup.string().email("Invalid email format").required("Email is required"),
        phoneno: yup.string().required("Phone number is required"),
        date: yup.date().required("Date is required"),
        gender: yup.string().required("Gender is required"),
        // images: yup.array().min(3, "At least one image is required"),
        language: yup.string().required("Language is required")
    });

    const onsubmit = (values, { resetForm }) => {
        const newData = {
            ...values,
            images: Object.values(images),
        };

        if (edit) {
            let updateDataDetail = [...data];
            updateDataDetail[index] = newData;
            setData(updateDataDetail);
        } else {
            setData(prevData => [...prevData, newData]);
        }
        console.log('Data:', data);
        resetForm();
        handleClose();
    }

    const handleEdit = (profile, index) => {
        setupdateData(profile);
        setIndex(index);
        setImages(profile.images.reduce((acc, img, idx) => ({ ...acc, [idx]: img }), {}));
        handleShow(true);
        setEdit(true);
    }

    const handleDelete = (index) => {
        setData(prevData => prevData.filter((_, i) => i !== index));
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow} style={{ marginTop: "100px" }}>
                Add Data
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Profile Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            name: edit ? updateData.name : "",
                            email: edit ? updateData.email : "",
                            phoneno: edit ? updateData.phoneno : "",
                            date: edit ? new Date(updateData.date) : new Date(),
                            gender: edit ? updateData.gender : "",
                            images: edit ? updateData.images : [],
                            language: edit ? updateData.language : "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={onsubmit}
                    >
                        {({ setFieldValue, values }) => (
                            <Form>
                                <div>
                                    <Field as={TextField} name="name" label="Name" className="form-control mb-2" />
                                    <ErrorMessage component="div" name="name" className='text-danger' />
                                </div>
                                <div>
                                    <Field as={TextField} name="email" label="Email" className="form-control mb-2" />
                                    <ErrorMessage component="div" name="email" className='text-danger' />
                                </div>
                                <div>
                                    <Field as={TextField} name="phoneno" label="Phone Number" className="form-control mb-2" />
                                    <ErrorMessage component="div" name="phoneno" className='text-danger' />
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="gender"
                                        id="male"
                                        value="Male"
                                        checked={values.gender === "Male"}
                                        onChange={() => setFieldValue("gender", "Male")}
                                    />
                                    <label className="form-check-label" htmlFor="male">
                                        Male
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="gender"
                                        id="female"
                                        value="Female"
                                        checked={values.gender === "Female"}
                                        onChange={() => setFieldValue("gender", "Female")}
                                    />
                                    <label className="form-check-label" htmlFor="female">
                                        Female
                                    </label>
                                </div>
                                <ErrorMessage component="div" name="gender" className='text-danger' />
                                <div>
                                    <Dropdown onSelect={(selected) => setFieldValue("language", selected)} className='form-control mb-2'>
                                        <Dropdown.Toggle variant="success">
                                            {values.language ? values.language : "Select Language"}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey="English">English</Dropdown.Item>
                                            <Dropdown.Item eventKey="Gujarati">Gujarati</Dropdown.Item>
                                            <Dropdown.Item eventKey="Hindi">Hindi</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <ErrorMessage component="div" name="language" className='text-danger' />
                                </div>
                                <MultiImageInput
                                    images={images}
                                    setImages={setImages}
                                    max={10}
                                    cropConfig={{ crop, ruleOfThirds: true }}
                                />
                                <ErrorMessage component="div" name="images" className='text-danger' />
                                <div>
                                    <DatePicker
                                        selected={values.date}
                                        onChange={(date) => { setStartDate(date); setFieldValue("date", date) }}
                                        name="date"
                                        className="form-control mb-2"
                                    />
                                    <ErrorMessage component="div" name="date" className='text-danger' />
                                </div>
                                <div>
                                    <button type="submit" className='btn btn-primary'>Submit</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <div>
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className='form-control mb-4' placeholder="Search" />
                <table className='table text-center'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Gender</th>
                            <th>Language</th>
                            <th>Date</th>
                            <th>Images</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((profile, index) => (
                            <tr key={index}>
                                <td>{profile.name}</td>
                                <td>{profile.email}</td>
                                <td>{profile.phoneno}</td>
                                <td>{profile.gender}</td>
                                <td>{profile.language}</td>
                                <td>{new Date(profile.date).toDateString()}</td>
                                <td>
                                    {profile.images && profile.images.map((image, imgIndex) => (
                                        <img
                                            key={imgIndex}
                                            src={image}
                                            alt={`Profile ${imgIndex}`}
                                            style={{ width: '50px', height: '50px', marginRight: '10px' }}
                                        />
                                    ))}
                                </td>
                                <td>
                                    <button type="button" onClick={() => handleEdit(profile, index)} className="btn btn-warning me-2">Edit</button>
                                    <button type="button" onClick={() => handleDelete(index)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ProfileDetail
