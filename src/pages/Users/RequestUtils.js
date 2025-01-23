import { Link } from 'react-router-dom';

// set row color per status
export function getStatusColor(status) {
  switch (status) {
    case 1:
      return 'bg-yellow-300'; // awaits recycler
    case 2:
      return 'bg-purple-300'; // awaits user approvel
    case 3:
      return 'bg-green-300'; // Completed
    case 4:
      return 'bg-red-300'; // canceled
    case 5:
      return 'bg-blue-300'; // awaits recycler pickup
    default:
      return '';
  }
}

// Buttons rendering
export function renderButtons(
  status,
  requestId,
  handleAccept,
  handleDecline,
  handleCancel,
  openModal
) {
  switch (status) {
    case 1:
      return (
        <>
          <button className="mb-2 mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <Link to={`/user/update-request?Id=${requestId}`}>Update</Link>
          </button>
          <button
            onClick={() => handleCancel(requestId)}
            className=" mb-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel Request
          </button>
        </>
      );
    case 2:
      return (
        <>
          <button
            onClick={() => handleAccept(requestId)}
            className="mb-2 mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Accept
          </button>
          <button
            onClick={() => handleDecline(requestId)}
            className="mb-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Decline
          </button>
        </>
      );
    case 3:
      return (
        <>
          <p className="mb-2 text-black font-bold">Completed</p>
        </>
      );
    case 4:
      return (
        <>
          <p className="mb-2 text-black font-bold">Canceled</p>
        </>
      );
    case 5:
      return (
        <>
          <>
            <button
              onClick={openModal} // Open the modal instead of handleAcceptAndClose
              className="mb-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Accept & Close
            </button>
            <button
              onClick={() => handleDecline(requestId)}
              className="mb-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel Pickup
            </button>
          </>{' '}
        </>
      );
    default:
      return null;
  }
}

export function validateInputs({
  fullName,
  reqAddress,
  phoneNumber,
  bottlesNumber,
  fromTime,
  toTime,
}) {
  if (!/^[A-Za-z]{2,}\s[A-Za-z]{2,}$/.test(fullName)) {
    return {
      isValid: false,
      message: 'Please enter a valid name.',
    };
  }

  if (reqAddress === '') {
    return {
      isValid: false,
      message: 'Please enter a valid address.',
    };
  }

  if (!/^\d{10}$/.test(phoneNumber.replace(/\s/g, ''))) {
    return {
      isValid: false,
      message: 'Please enter a valid phone number.',
    };
  }

  if (!/^\d+$/.test(bottlesNumber) || /\s/.test(bottlesNumber)) {
    return {
      isValid: false,
      message: 'Please enter a valid number of bottles.',
    };
  }

  if (fromTime >= toTime) {
    return {
      isValid: false,
      message: 'Please select a valid time range.',
    };
  }

  return {
    isValid: true,
    message: 'Inputs are valid.',
  };
}

export const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
