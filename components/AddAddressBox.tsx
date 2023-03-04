import ReactModal from "react-modal";
import { useEffect, useState } from "react";

function AddAddressBox({modal,setPrevModal}: {modal : any,setPrevModal: any}) {
 
  
      const [step, setStep] = useState(1);

      const nextStep = () => {
        setStep(step + 1);
      };

      const prevStep = () => {
        setStep(step - 1);
      };
    

  return (
    <div>
      <span onClick={setPrevModal} className="text-primary-green font-semibold">
        Tambah Alamat Baru
      </span>
      <ReactModal
        id="modal-address"
        isOpen={modal}
        // onRequestClose={() => setPrevModal()}
        className="modal-address max-w-xl  mx-auto   h-full overflow-y-auto  bg-white shadow-lg absolute border-none "
        overlayClassName="overlay"
      >
        {/* <h1 className="mb-4 text-2xl font-bold">Choose Quantity</h1> */}
        <div className="modal-header">
          <h2>Step {step}</h2>
          <div>
            {step > 1 && (
              <button className="modal-nav-button" onClick={prevStep}>
                Previous
              </button>
            )}
            {step < 3 && (
              <button className="modal-nav-button" onClick={nextStep}>
                Next
              </button>
            )}
          </div>
        </div>

        {step === 1 && (
          <div>
            <h3>Search for Address</h3>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3>Pinpoint Location</h3>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3>Enter Address Details</h3>
          </div>
        )}
      </ReactModal>
    </div>
  );
}

export default AddAddressBox;
