export const ContactComponent = (props) => {
  return (
    <div id='contact' className='text-center'>
      <div className='container'>
        <div className='contact-title'>
          <h2>Contact Us</h2>
        </div>
        <div className='location'>
          <h4>Address:</h4>
          <h1> 
            {props.data ? props.data.address : "loading..."}
          </h1>
        </div>
        <div className='contact'>
          <h4>Call or Email:</h4>
          <h1> 
            {props.data ? props.data.contact.phone : "loading..."}
          </h1>
          <h1> 
            {props.data ? props.data.contact.email : "loading..."}
          </h1>
        </div>
        <div className='row'>
          <h3>
            Have any questions or comments?
            <br></br>
            <br></br>
            You can get in touch with us by filling out this <a href="https://docs.google.com/forms/d/e/1FAIpQLSfYlRNzFTCSV5Tq9460DD0JgHMLXI4s1GEGs_oQnghPRGUB2A/viewform" target="_blank">Information Request Form</a>.
          </h3>
        </div>
      </div>
    </div>
  )
}