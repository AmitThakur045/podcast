import React, { useState } from "react";
import Card from "../../../../components/Card/Card";
import Button from "../../../../components/Button/Button";
import { AiFillPhone } from "react-icons/ai";
import TextInput from "../../../../components/TextInput/TextInput";
import styles from "../StepPhoneEmail.module.css";
import { sendOtp } from "../../../../API";
import { useDispatch } from "react-redux";
import { setOtp } from "../../../../store/authSlice";

const Phone = ({ onClick }) => {
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (!phone) return;
    // server request
    try {
      const { data } = await sendOtp({ phone: phone, email: "" });
      dispatch(
        setOtp({ phone: data.phone, email: data.email, hash: data.hash })
      );
      onClick();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card
      title="Enter your phone number"
      icon={<AiFillPhone color="#ffcd3a" fontSize={30} />}
    >
      <TextInput
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Enter your phone"
      />
      <div>
        <div className={styles.actionButtonWrap}>
          <Button onClick={handleSubmit} text="Next" />
        </div>
        <p className={styles.paragraph}>
          By entering your number, you're agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </div>
    </Card>
  );
};

export default Phone;
