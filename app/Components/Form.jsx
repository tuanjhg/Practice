
'use client'
import {Button} from "./Button"
import { useState } from "react";

const Form = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
    });

    const handleChange = (e) => {
        const { name, value} = e.target;
            setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
    };

    return (
        <form className="max-w-md p-5 border border-gray-300 rounded-md" onSubmit={handleSubmit}>
            <label htmlFor="firstName" className="block mb-1 text-sm font-mono text-gray-700">
                First Name:
            </label>
            <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="block w-full  bg-gray-300 " />

            <label htmlFor="lastName" className="block mb-1 text-sm font-mono text-gray-700">
                Last Name:
            </label>
            <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="block w-full  bg-gray-300" />

            <label htmlFor="email" className="block mb-1 text-sm font-mono text-gray-700">
                Email:
            </label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full  bg-gray-300"/>

            <label htmlFor="address" className="block mb-1 text-sm font-mono text-gray-700">
                Address:
            </label>
            <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="block w-full bg-gray-300"/>
            <Button>Submit</Button>
        </form>
    );
};

export default Form;