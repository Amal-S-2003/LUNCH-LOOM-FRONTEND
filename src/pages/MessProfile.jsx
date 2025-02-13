import React, { useEffect, useState } from "react";
import { getMessData, updateMess } from "../services/all_api";
import { server_url } from "../services/server_url";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form, Toast, ToastContainer } from "react-bootstrap";
import { toast } from "react-toastify";

const MessProfile = () => {
  const [messData, setMessData] = useState({});
  const [loggedMessData, setLoggedMessData] = useState({});
  const [preview, setPreview] = useState("");
  const [show, setShow] = useState(false);

  const messId = sessionStorage.getItem("messId");
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchLoggedMessData = async () => {
    try {
      const result = await getMessData({ messId });
      const data = result.data;
      setLoggedMessData(data);
      setMessData({
        messId,
        messName: data.messName || "",
        phoneNumber: data.phoneNumber || "",
        emailAddress: data.emailAddress || "",
        address: data.address || "",
        location: data.location || "",
        messDescription: data.messDescription || "",
        googleMapLink: data.googleMapLink || "",
        homeDelivery: data.homeDelivery || false,
        messImage: "",
      });
    } catch (error) {
      console.error("Error fetching mess data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessData({ ...messData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const reqHeader = { "Content-Type": "multipart/form-data" };
      const result = await updateMess(messData, reqHeader);
      toast.success(result.data)
      handleClose();
      fetchLoggedMessData();
    } catch (err) {
      console.error("Error updating mess data:", err);
    }
  };

  const logout = async () => {
    sessionStorage.clear();
    await navigate("/");
  };

  useEffect(() => {
    if (messData.messImage) {
      const objectUrl = URL.createObjectURL(messData.messImage);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [messData.messImage]);

  useEffect(() => {
    fetchLoggedMessData();
  }, [messId]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 flex justify-center items-center">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="w-full h-64 relative">
          <img
            src={
              loggedMessData.messImage
                ? `${server_url}/uploads/${loggedMessData.messImage}`
                : "https://via.placeholder.com/800x400?text=Mess+Image"
            }
            alt={`${loggedMessData.messName || "Mess"} Image`}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white py-2 px-4">
            <h1 className="text-2xl font-semibold">
              {loggedMessData.messName || "Mess Name"}
            </h1>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-600 text-sm mb-4">
            <span className="font-medium">Location:</span>{" "}
            {loggedMessData.location || "Location not available"}
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            {loggedMessData.messDescription || "No description available."}
          </p>

          {loggedMessData.homeDelivery && (
            <div className="mb-6 inline-flex items-center bg-green-100 text-green-600 text-sm font-medium py-2 px-4 rounded-full">
              <span className="text-lg">✔ </span>
              <span className="ml-2">Home Delivery Available</span>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <div className="flex items-center">
              <span className="text-gray-600 font-medium">Phone:</span>
              <span className="ml-2 text-gray-800">
                {loggedMessData.phoneNumber || "N/A"}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 font-medium">Email:</span>
              <span className="ml-2 text-gray-800">
                {loggedMessData.emailAddress || "N/A"}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 font-medium">Address:</span>
              <span className="ml-2 text-gray-800">
                {loggedMessData.address || "N/A"}
              </span>
            </div>
          </div>

          <div className="btns">
            <button
              className="px-3 py-1 rounded-lg text-white fw-medium me-3 w-32 hover:bg-green-600 bg-green-500"
              onClick={handleShow}
            >
              Edit
            </button>
            <button
              className="px-3 py-1 rounded-lg text-white fw-medium me-3 w-32 hover:bg-blue-600 bg-blue-500"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Mess Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Mess Image */}
            <Form.Group className="mb-3 flex flex-col items-center">
              <label className="flex flex-col items-center">
                <input
                  hidden
                  type="file"
                  onChange={(e) =>
                    setMessData({
                      ...messData,
                      messImage: e.target.files[0],
                    })
                  }
                />
                <img
                  className="w-32 h-32 rounded-lg border-2 border-gray-300"
                  src={
                    preview
                      ? preview
                      : `${server_url}/uploads/${loggedMessData.messImage}`
                  }
                  alt="No Mess Image"
                />
              </label>
              <Form.Label className="fw-bold">Mess Image</Form.Label>
            </Form.Group>
            <div className="row">
              {/* Left Column */}
              <div className="col-md-6">
                {/* Mess Name */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Mess Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="messName"
                    value={messData.messName}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Phone Number */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    value={messData.phoneNumber}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Email Address */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="emailAddress"
                    value={messData.emailAddress}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>

              {/* Right Column */}
              <div className="col-md-6">
                {/* Location */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={messData.location}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Google Map Link */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Google Map Link</Form.Label>
                  <Form.Control
                    type="text"
                    name="googleMapLink"
                    value={messData.googleMapLink}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Home Delivery */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Home Delivery</Form.Label>
                  <Form.Check
                    type="checkbox"
                    name="homeDelivery"
                    checked={messData.homeDelivery}
                    onChange={(e) =>
                      setMessData({
                        ...messData,
                        homeDelivery: e.target.checked,
                      })
                    }
                    label="Available"
                  />
                </Form.Group>
              </div>

              {/* Mess Description */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Mess Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="messDescription"
                  value={messData.messDescription}
                  onChange={handleChange}
                />
              </Form.Group>

              {/* Address */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={messData.address}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default MessProfile;
