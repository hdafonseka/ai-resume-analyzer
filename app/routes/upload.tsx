import React, {type FormEvent} from "react";
import Navbar from "~/components/Navbar";
import {useState} from "react";
import FileUploader from "~/components/FileUploader";

const Upload = () => {
  const [isProcessing, setProcessing] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [files, setFiles] = useState<File| null>(null );

  const handleFileSelect=(file:File|null) =>{
    setFiles(file);
  }

  const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget.closest('form');
    if(!form) return;
    const formData = new FormData(form);

    const companyName = formData.get('company-name') as string;
    const jobTitle = formData.get('job-title') as string;
    const jobDescription = formData.get('job-description') as string;

    console.log({companyName,jobTitle, jobDescription})

  }


  return(
  <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />
    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Smart feedback for your dream job</h1>
        {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img src="/images/resume-scan.gif" className="w-full" />
            </>
        ) : (
            <h2>Drop your resume for ATS score and improvement tips</h2>
        )}
        {!isProcessing && (
            <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
              <div className="form-div">
                <label htmlFor="company-name">Company Name</label>
                <input
                    type="text"
                    name="company-name"
                    id="company-name"
                    placeholder="Company Name"

                />
              </div>
              <div className="form-div">
                <label htmlFor="job-title">Job Title</label>
                <input
                    type="text"
                    name="job-title"
                    id="job-title"
                    placeholder="Job Title"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-description">Job Description</label>
                <textarea
                    rows={4}
                    name="job-description"
                    id="job-description"
                    placeholder="Job Description"
                />
              </div>
              <div className="form-div">
                <label htmlFor="uploader">upload Resume</label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>
              <button className="primary-button" type="submit">
                Analyze Resume
              </button>
            </form>

        )}

      </div>

    </section>
  </main>
  )
}

export default Upload;
