import { useEffect } from 'react'

const Notification = ({ message, show, setShow }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [show, setShow]);

  if (!show || !message) return null;

    return (
      <div className="error">
        {message}
      </div>
    )
  }

  export default Notification