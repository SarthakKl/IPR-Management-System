import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const ApplicationForm = (props,ref) => {
    const { createApplication } = props
    const [desc, setDesc] = useState('This IPR is for test purpose')
    const [title, setTitle] = useState('Test IPR')
    const [docUrl, setDocUrl] = useState('https://www.proind.in/product/lpms/ipr-management-system/')
    const [form1, setForm1] = useState(null)
    const [form3, setForm3] = useState(null)
    const [form5, setForm5] = useState(null)
    const [form48, setForm48] = useState(null)
    const [idProof, setIdProof] = useState(null)
    const [docFile, setDocFile] = useState(null)
    const [docType, setDocType] = useState('url')
    const [iprType, setIprType] = useState('patent')

    const notify = (msg) => toast.error(msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const selectFile = ({target:{files,value}},setFn) => {
        if (files[0]?.size > 2 * 1024 * 1024) {
            value = null
            return notify('File size greater than permitted file size of 2Mb')
        }
        setFn(files[0] || null)
    }
    const onDocChange = (e) => {
        if (e.target.checked)
            setDocType(e.target.id)
        if (e.target.id === 'url')
            setDocFile(null)
        if (e.target.id ==='file')
            setDocUrl('')
    }
    const submitHandler = async()=>{
        if(!title) return notify("Please add title!")
        if(!desc) return notify("Please add description!")
        if(!docUrl && !docFile) return notify("Please attach drawings of your work!")
        if(!idProof)return notify("Please attach your id proof!")
        if(!form1 && iprType==='patent') return notify("Please attach form 1!")
        if(!form3 && iprType==='patent') return notify("Please attach form 3!")
        if(!form5 && iprType==='patent') return notify("Please attach form 5!")
        if(!form48 && iprType==='trademark') return notify("Please attach form 48!")
        const data = new FormData()
        const commonData = {
            title,desc,docType,iprType,idProof,content:docFile || docUrl
        }
        Object.entries(commonData).forEach(([k,v])=>data.append(k,v))
        if(iprType==='patent'){
            data.append('form1', form1)
            data.append('form3', form3)
            data.append('form5', form5)    
        }
        if(iprType==='trademark')data.append('form48', form48)  
        return createApplication(data)
    }
    return (
        <div className='application-form'>
            <div className='form-body'>
                <h6>IPR TYPE</h6>
                <div className='ipr-type'>
                    <div className='checkbox-wrapper'>
                        <input
                            id='patent-ipr'
                            onChange={(e) => e.target.checked ? setIprType('patent') : null}
                            name='ipr-type'
                            type='radio'
                            checked={iprType === 'patent'}
                        />
                        <label htmlFor='patent-ipr'>Patent</label>
                    </div>
                    <div className='checkbox-wrapper'>
                        <input
                            id='trademark-ipr'
                            onChange={(e) => e.target.checked ? setIprType('trademark') : null}
                            name='ipr-type'
                            value='trademark'
                            type='radio'
                            checked={iprType === 'trademark'}
                        />
                        <label htmlFor='trademark-ipr'>Trademark</label>
                    </div>
                    <div className='checkbox-wrapper'>
                        <input
                            id='copyright-ipr'
                            onChange={(e) => e.target.checked ? setIprType('copyright') : null}
                            name='ipr-type'
                            value='copyright'
                            type='radio'
                            checked={iprType === 'copyright'}
                        />
                        <label htmlFor='copyright-ipr'>Copyright</label>
                    </div>
                </div>
                <div className='field-wrapper'>
                    <label htmlFor='title'>Title</label>
                    <input
                        id='title'
                        type='text'
                        placeholder='Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='field-wrapper'>
                    <label htmlFor='description'>Description</label>
                    <textarea
                        name="description"
                        id="descrippaymentHandler.show(application)tion"
                        value={desc}
                        rows={3}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </div>
                <div className=''>
                    <div>Drawings of work</div>
                    <div className='doc-type-wrapper'>
                        <div className='doc-type'>
                            <input
                                type='radio'
                                id='url'
                                name='doc-type'
                                onChange={onDocChange}
                                checked={docType == 'url'} 
                            />
                            <label htmlFor='url'>URL</label>
                        </div>
                        <div className='doc-type'>
                            <input
                                type='radio'
                                id='file'
                                name='doc-type'
                                onChange={onDocChange}
                            />
                            <label htmlFor='file'>FILE</label>
                        </div>
                    </div>
                    {
                        docType === 'url' &&
                        <div className="field-wrapper">
                            <div className='field-wrapper'>
                                <label htmlFor='description'>Doc Url</label>
                                <input
                                    type='text'
                                    placeholder='Paste your url here'
                                    value={docUrl}
                                    onChange={(e) => setDocUrl(e.target.value)}
                                />
                            </div>
                        </div>
                        // <input  />
                    }
                    {
                        docType === 'file' &&
                        <input
                            type='file'
                            id='file-select'
                            accept='image/*,.pdf,.doc,.docx'
                            onChange={(e)=>selectFile(e,setDocFile)} 
                        />
                    }
                </div>
                <div className='field-wrapper'>
                    <div>Id Proof(Aadhar Card/PAN Card)</div>
                    <input 
                        type='file' 
                        id='id-select' 
                        accept='image/*,.pdf,.doc,.docx' 
                        onChange={(e)=>selectFile(e,setIdProof)} 
                    />
                </div>
            </div>
            {
                iprType==='patent' &&
                <>
                    <div className='field-wrapper'>
                        <div>
                            <span>Form 1</span>
                            <a
                                href='https://ipindia.gov.in/writereaddata/Portal/IPOFormUpload/1_12_1/form-1.pdf'
                                target='_blank'
                                rel='noreferrer'
                                className='form-download'
                            >
                                [Download]
                            </a>
                        </div>
                        <input 
                            type='file' 
                            accept='image/*,.pdf,.doc,.docx' 
                            id='form1-select' 
                            onChange={(e)=>selectFile(e,setForm1)} 
                        />
                    </div>
                    <div className='field-wrapper'>
                        <div>
                            Form 3
                            <a
                                href='https://ipindia.gov.in/writereaddata/Portal/IPOFormUpload/1_14_1/form-3.pdf'
                                target='_blank'
                                rel='noreferrer'
                                className='form-download'
                            >
                                [Download]
                            </a>
                        </div>
                        <input 
                            type='file' 
                            accept='image/*,.pdf,.doc,.docx' 
                            id='form3-select' 
                            onChange={(e)=>selectFile(e,setForm3)} 
                        />
                    </div>
                    <div className='field-wrapper'>
                        <div>
                            Form 5
                            <a
                                href='https://ipindia.gov.in/writereaddata/Portal/ev/forms/Form_5.pdf'
                                target='_blank'
                                rel='noreferrer'
                                className='form-download'
                            >
                                [Download]
                            </a>
                        </div>
                        <input 
                            type='file' 
                            accept='image/*,.pdf,.doc,.docx' 
                            id='form5-select'  
                            onChange={(e)=>selectFile(e,setForm5)} 
                        />
                    </div>
                </>
            }
            {
                iprType==='trademark' && 
                <>
                    <div className='field-wrapper'>
                        <div>
                            <span>Form 48</span>
                            <a
                                href='https://ipindia.gov.in/writereaddata/images/pdf/form-TM-48.pdf'
                                target='_blank'
                                rel='noreferrer'
                                className='form-download'
                            >
                                [Download]
                            </a>
                        </div>
                        <input 
                            type='file' 
                            accept='image/*,.pdf,.doc,.docx' 
                            id='form48-select' 
                            onChange={(e)=>selectFile(e,setForm48)} 
                        />
                    </div>
                </>
            }
            <button ref={ref} onClick={submitHandler} style={{display:"none"}}>submit</button>
        </div>
    )
}

export default React.forwardRef(ApplicationForm)