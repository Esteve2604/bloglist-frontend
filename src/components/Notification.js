const SuccessNotification = ({successMessage}) => {
    if (successMessage === null) {
      return null
    }
  
    return (
      <div className="success">
        {successMessage}
      </div>
    )
  }
  const ErrorNotification = ({errorMessage}) => {
    if (errorMessage === null) {
      return null
    }
  
    return (
      <div className="error">
        {errorMessage}
      </div>
    )
  }
  // eslint-disable-next-line import/no-anonymous-default-export
  export default {SuccessNotification, ErrorNotification}