import React from 'react'
import "./sell.scss"
import { ArrowBack } from '@mui/icons-material'
import { Field, reduxForm } from "redux-form"
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useNavigate } from "react-router"
// import { connect } from 'react-redux';
// import { createAd } from "../../actions/index"
import axios from "axios"

const renderError = ({ error, touched }) => {
    if (touched && error) {
        return (
            <div className='error'>
                * {error}
            </div>
        )
    }
}

const renderInput = ({ input, label, meta }) => {
    return (
        <div className='container'>
            <span className='title'>{label}</span>
            <div className="input d-flex align-items-center">
                {label === "Price *" ? <CurrencyRupeeIcon className='mr-2' /> : ''}
                <input {...input} />
            </div>
            <div className=''>
                {renderError(meta)}

            </div>
        </div>

    )
}

const renderTextArea = ({ input, label, meta }) => {
    return (
        <>
            <div className='textareacontainer d-flex flex-column'>
                <span className='title'>{label}</span>
                <textarea rows={5} {...input}></textarea>
            </div>
            <div className='ms-4'>
                {renderError(meta)}
            </div>
        </>
    )
}

const Sell = (props) => {
    const navigate = useNavigate();

    const onSubmit = (formValues) => {
        console.log(formValues)
        const postdata = async (formValues) => {
            const res = await axios.post('/ads', formValues, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            navigate('/')
        }
        postdata(formValues);
    }

    return (
        <div className='sellContainer' >
            <div className="main vh-100 mt-4 d-flex flex-column align-items-center">
                <h1 className='mb-4'>Post Your Ad</h1>
                <div className="postForm">
                    <div className="section1">
                        <h6>Selected Category</h6>
                        <span className='category'>Moblies / Moblie Phones</span>
                        <span className='change'>Change</span>
                    </div>
                    <form className='' onSubmit={props.handleSubmit(onSubmit)}  >
                        <div className='section2'>
                            <h1>Include Some Details</h1>
                            <Field name='adTitle' component={renderInput} label="Ad title *" />
                            <Field name='description' component={renderTextArea} label="Description *" />
                        </div>
                        <div className='section3'>
                            <h1>Set a price</h1>
                            <Field name='price' component={renderInput} label="Price *" />
                        </div>
                        <div className='section4'>
                            <h1>Enter a URL:</h1>
                            <Field name='image' component={renderInput} label="Images *" />
                        </div>
                        <div className='button'>
                            <button className='btn btn-success'>
                                Post Now
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}


// class Sell extends React.Component {
//     renderError({ error, touched }) {
//         if (touched && error) {
//             return (
//                 <div className='error'>
//                     * {error}
//                 </div>
//             )
//         }
//     }

//     renderInput = ({ input, label, meta }) => {
//         return (
//             <div className='container'>
//                 <span className='title'>{label}</span>
//                 <div className="input d-flex align-items-center">
//                     {label === "Price *" ? <CurrencyRupeeIcon className='mr-2' /> : ''}
//                     <input {...input} />
//                 </div>
//                 <div className=''>
//                     {this.renderError(meta)}

//                 </div>
//             </div>

//         )
//     }

//     renderTextArea = ({ input, label, meta }) => {
//         return (
//             <>
//                 <div className='textareacontainer d-flex flex-column'>
//                     <span className='title'>{label}</span>
//                     <textarea rows={5} {...input}></textarea>
//                 </div>
//                 <div className='ms-4'>
//                     {this.renderError(meta)}
//                 </div>
//             </>
//         )
//     }

//     onSubmit(formValues) {
//         console.log(formValues)
//         const postdata = async (formValues) => {
//             const res = await axios.post('/ads', formValues, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Accept': 'application/json',
//                 }
//             })
//         }
//         postdata(formValues);
//     }

//     render() {
//         return (
//             <div className='sellContainer' >
//                 <div className="main vh-100 mt-4 d-flex flex-column align-items-center">
//                     <h1 className='mb-4'>Post Your Ad</h1>
//                     <div className="postForm">
//                         <div className="section1">
//                             <h6>Selected Category</h6>
//                             <span className='category'>Moblies / Moblie Phones</span>
//                             <span className='change'>Change</span>
//                         </div>
//                         <form className='' onSubmit={this.props.handleSubmit(this.onSubmit)}  >
//                             <div className='section2'>
//                                 <h1>Include Some Details</h1>
//                                 <Field name='adTitle' component={this.renderInput} label="Ad title *" />
//                                 <Field name='description' component={this.renderTextArea} label="Description *" />
//                             </div>
//                             <div className='section3'>
//                                 <h1>Set a price</h1>
//                                 <Field name='price' component={this.renderInput} label="Price *" />
//                             </div>
//                             <div className='section4'>
//                                 <h1>Enter a URL:</h1>
//                                 <Field name='image' component={this.renderInput} label="Images *" />
//                             </div>
//                             <div className='button'>
//                                 <button className='btn btn-success'>
//                                     Post Now
//                                 </button>
//                             </div>
//                         </form>
//                     </div>

//                 </div>
//             </div>
//         )
//     }
// }

const validate = (formValues) => {
    const errors = {}
    if (!formValues.adTitle) {
        errors.adTitle = "You must enter an AdTitle"
    }
    if (!formValues.description) {
        errors.description = "You must enter a description"
    }
    if (!formValues.price) {
        errors.price = "You must enter a price"
    }
    if (!formValues.image) {
        errors.image = "You must post an Image"
    }
    return errors
}

const formWrapped = reduxForm({
    form: 'createAd',
    validate
})(Sell)


export default formWrapped