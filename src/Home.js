import React, { useState } from "react";
import SignaturePad from 'react-signature-canvas';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from 'react-i18next'

export default function Home() {

  const { t } = useTranslation()
  const current = new Date();
  const current_date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;

  // set default
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // const [dob, setDob] = useState('');
  const [dob, setDob] = useState(new Date());
  const [one, setOne] = useState('');
  const [two, setTwo] = useState('');
  const [three, setThree] = useState('');
  const [four, setFour] = useState('');
  const [five, setFive] = useState('');
  const [six, setSix] = useState('');
  const [seven, setSeven] = useState('');
  const [eight, setEight] = useState('');
  const [nine, setNine] = useState('');
  const [ten, setTen] = useState('');
  const [eleven, setEleven] = useState('');
  // const [trimmedDataURL, setTrimmedDataURL] = useState(null); // image of sign
  const navigate = useNavigate();

  let sigPad = {}

  const clear = () => {
    sigPad.clear()
  }

  const redirectToSuccess = () => {
    navigate('/success');
  }

  const redirectToError = () => {
    navigate('/error');
  }

  const saveForm = async () => {

    const signURL = sigPad.getTrimmedCanvas().toDataURL('image/png')
    const postData = {
      'email': email,
      'firstName': firstName,
      'lastName': lastName,
      'dob': dob,
      'q1': one,
      'q2': two,
      'q3': three,
      'q4': four,
      'q5': five,
      'q6': six,
      'q7': seven,
      'q8': eight,
      'q9': nine,
      'q10': ten,
      'sign': signURL
    };
    console.log(postData);

    // let response = {};
    
    // const baseurl = "https://webhook.site/79d9e419-843b-4f85-9bc6-11b29dddd446";
    // https://7or29bbozh.execute-api.us-east-1.amazonaws.com/dev/rest-lambda-ddb
    const baseurl = "https://w8jwspmzxd.execute-api.us-east-1.amazonaws.com/Prod"
    await fetch(baseurl + '/hello', {
      // mode: 'no-cors',
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData)
    }).then(data => data.json())
    .then((response) => {
      console.log("response success ==="+ response.data);
      redirectToSuccess();
      // console.log('New patient information submitted');
    }).catch(error => {
      console.log("response error ==="+ error);
      throw new Error(`Request failed: ${error}`);
    });
  }

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent default submission
    try {
        await saveForm();
    } catch (e) {
        console.log(`Error saving your information === ${e.message}`);
        redirectToError();
    }
  }

  return (
      <div className="home">
        <form onSubmit={onSubmit}>
          <h2>{t('covid_screening_questionaire')}</h2>

          <label>{t('email')}
            <span class="required">*</span>
          </label>
          <input 
            type="text" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>
            <label>{t('first_name')}
              <span class="required">*</span>
            </label>
            <input 
              type="text" 
              required 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label>{t('last_name')}
              <span class="required">*</span>
            </label>
            <input 
              type="text" 
              required 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label>{t('dob')}
              <span class="required">*</span>
            </label>
            <DatePicker 
              selected={dob}
              onChange={(date) => setDob(date)}
              dateFormat="MM/dd/yyyy" />
          </div>

          <div> {/* radio button start */}
            <label>{t('q1')}
              <span class="required">*</span>
            </label>
            <div className="radio-buttons">
              <input
                className="radio"
                type="radio"
                name="q1"
                required
                value='YES'
                checked={one === 'YES'}
                onChange={(e) => setOne(e.target.value)}
              /> {t('yes')}
              <input
                className="radio"
                type="radio"  
                name="q1"
                required
                value='NO'
                checked={one === 'NO'}
                onChange={(e) => setOne(e.target.value)}
              /> {t('no')}
              <input
                className="radio"
                type="radio"
                name="q1"
                required
                value='PREFER NOT TO ANSWER'
                checked={one === 'PREFER NOT TO ANSWER'}
                onChange={(e) => setOne(e.target.value)}
              /> {t('prefer_not_to_ans')}
            </div>
          </div> {/* radio button end */}

          <div> {/* radio button start */}
            <label>{t('q2')}
              <span class="required">*</span>
            </label>
            <div className="radio-buttons">
              <input
                className="radio"
                type="radio" 
                name="q2"
                required
                value='YES'
                checked={two === 'YES'}
                onChange={(e) => setTwo(e.target.value)}
              /> {t('yes')}
              <input
                className="radio"
                type="radio"
                name="q2"
                required
                value='NO'
                checked={two === 'NO'}
                onChange={(e) => setTwo(e.target.value)}
              /> {t('no')}
            </div>
          </div> {/* radio button end */}

          <div> {/* radio button start */}
            <label>{t('q3')}
              <span class="required">*</span>
            </label>
            <div className="radio-buttons">
              <input
                className="radio"
                type="radio"
                name="q3"
                required
                value='YES'
                checked={three === 'YES'}
                onChange={(e) => setThree(e.target.value)}
              /> {t('yes')}
              <input
                className="radio"
                type="radio"
                name="q3"
                required  
                value='NO'
                checked={three === 'NO'}
                onChange={(e) => setThree(e.target.value)}
              /> {t('no')}
            </div>
          </div> {/* radio button end */}

          <div> {/* radio button start */}
            <label>{t('q4')}
              <span class="required">*</span>
            </label>
            <div className="radio-buttons">
              <input
                className="radio"
                type="radio"
                name="q4"
                required 
                value='YES'
                checked={four === 'YES'}
                onChange={(e) => setFour(e.target.value)}
              /> {t('yes')}
              <input
                className="radio"
                type="radio" 
                name="q4"
                required  
                value='NO'
                checked={four === 'NO'}
                onChange={(e) => setFour(e.target.value)}
              /> {t('no')}
            </div>
          </div> {/* radio button end */}

          <div> {/* radio button start */}
            <label>{t('q5')}
              <span class="required">*</span>
            </label>
            <div className="radio-buttons">
              <input
                className="radio"
                type="radio" 
                name="q5"
                required 
                value='YES'
                checked={five === 'YES'}
                onChange={(e) => setFive(e.target.value)}
              /> {t('yes')}
              <input
                className="radio"
                type="radio"  
                name="q5"
                required 
                value='NO'
                checked={five === 'NO'}
                onChange={(e) => setFive(e.target.value)}
              /> {t('no')}
            </div>
          </div> {/* radio button end */}

          <div> {/* radio button start */}
            <label>{t('q6')}
              <span class="required">*</span>
            </label>
            <div className="radio-buttons">
              <input
                className="radio"
                type="radio" 
                name="q6"
                required 
                value='YES'
                checked={six === 'YES'}
                onChange={(e) => setSix(e.target.value)}
              /> {t('yes')}
              <input
                className="radio"
                type="radio"  
                name="q6"
                required 
                value='NO'
                checked={six === 'NO'}
                onChange={(e) => setSix(e.target.value)}
              /> {t('no')}
            </div>
          </div> {/* radio button end */}

          <div> {/* radio button start */}
            <label>{t('q7')}
              <span class="required">*</span>
            </label>
            <div className="radio-buttons">
              <input
                className="radio"
                name="q7"
                required 
                type="radio" 
                value='YES'
                checked={seven === 'YES'}
                onChange={(e) => setSeven(e.target.value)}
              /> {t('yes')}
              <input
                className="radio"
                type="radio"  
                name="q7"
                required 
                value='NO'
                checked={seven === 'NO'}
                onChange={(e) => setSeven(e.target.value)}
              /> {t('no')}
            </div>
          </div> {/* radio button end */}

          <div> {/* radio button start */}
            <label>{t('q8')}
              <span class="required">*</span>
            </label>
            <div className="radio-buttons">
              <input
                className="radio"
                type="radio" 
                name="q8"
                required 
                value='YES'
                checked={eight === 'YES'}
                onChange={(e) => setEight(e.target.value)}
              /> {t('yes')}
              <input
                className="radio"
                type="radio"  
                name="q8"
                required 
                value='NO'
                checked={eight === 'NO'}
                onChange={(e) => setEight(e.target.value)}
              /> {t('no')}
            </div>
          </div> {/* radio button end */}

          <div> {/* radio button start */}
            <label>{t('q9')}
              <span class="required">*</span>
            </label>
            <div className="radio-buttons">
              <input
                className="radio"
                type="radio" 
                name="q9"
                required 
                value='YES'
                checked={nine === 'YES'}
                onChange={(e) => setNine(e.target.value)}
              /> {t('yes')}
              <input
                className="radio"
                type="radio"  
                name="q9"
                required 
                value='NO'
                checked={nine === 'NO'}
                onChange={(e) => setNine(e.target.value)}
              /> {t('no')}
            </div>
          </div> {/* radio button end */}

          <div> {/* radio button start */}
            <label>{t('q10')}
              <span class="required">*</span>
            </label>
            <div className="radio-buttons">
              <input
                className="radio"
                type="radio" 
                name="q10"
                required 
                value='YES'
                checked={ten === 'YES'}
                onChange={(e) => setTen(e.target.value)}
              /> {t('yes')}
              <input
                className="radio"
                type="radio" 
                name="q10"
                required  
                value='NO'
                checked={ten === 'NO'}
                onChange={(e) => setTen(e.target.value)}
              /> {t('no')}
            </div>
          </div> {/* radio button end */}

          <div> {/* radio button start */}
            <label>{t('q11')}
              <span class="required">*</span>
            </label>
            <div className="radio-buttons">
              <input
                className="radio"
                type="radio" 
                name="q11"
                required 
                value='YES'
                checked={eleven === 'YES'}
                onChange={(e) => setEleven(e.target.value)}
              /> {t('yes')}
              <input
                className="radio"
                type="radio"  
                name="q11"
                required 
                value='NO'
                checked={eleven === 'NO'}
                onChange={(e) => setEleven(e.target.value)}
              /> {t('no')}
            </div>
          </div> {/* radio button end */}

          {/* Sign Section Start */}
          <div className="container">
            <label>{t('sign')}
              <span class="required">*</span>
            </label>
            <div className="sigContainer">
              <SignaturePad canvasProps={{className:sigPad}}
                ref={(ref) => { sigPad = ref }} />
            </div>
            <label>{t('date_today')}: {current_date} </label>
            {/* <button className="buttons" onClick={(e) => saveForm()}> */}
            <button className="buttons" type="submit">
              {t('btn_submit')}
            </button>
            {/* <button className="buttons" onClick={(e) => clear()}>
              Clear
            </button> */}
          </div>
        </form>
      </div>
  );
}
 
// export default Home;
