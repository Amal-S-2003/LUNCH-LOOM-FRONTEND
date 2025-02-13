import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getUserData } from "../services/all_api";
import { server_url } from "../services/server_url";
function ViewUsers() {
  // const users = [
  //   {
  //     username: "john_doe",
  //     email: "john.doe@example.com",
  //     phoneNumber: "123-456-7890",
  //     address: "123 Elm St, Springfield, IL",
  //   },
  //   {
  //     username: "jane_smith",
  //     email: "jane.smith@example.com",
  //     phoneNumber: "987-654-3210",
  //     address: "456 Oak St, Springfield, IL",
  //   },
  //   {
  //     username: "mike_brown",
  //     email: "mike.brown@example.com",
  //     phoneNumber: "555-123-4567",
  //     address: "789 Maple St, Springfield, IL",
  //   },
  //   {
  //     username: "emily_clark",
  //     email: "emily.clark@example.com",
  //     phoneNumber: "555-987-6543",
  //     address: "321 Birch St, Springfield, IL",
  //   },
  //   {
  //     username: "samuel_jones",
  //     email: "samuel.jones@example.com",
  //     phoneNumber: "555-456-7891",
  //     address: "654 Pine St, Springfield, IL",
  //   },
  //   {
  //     username: "olivia_wilson",
  //     email: "olivia.wilson@example.com",
  //     phoneNumber: "555-789-1234",
  //     address: "987 Cedar St, Springfield, IL",
  //   },
  //   {
  //     username: "david_martin",
  //     email: "david.martin@example.com",
  //     phoneNumber: "555-321-6548",
  //     address: "159 Willow St, Springfield, IL",
  //   },
  //   {
  //     username: "sophia_taylor",
  //     email: "sophia.taylor@example.com",
  //     phoneNumber: "555-654-9872",
  //     address: "753 Aspen St, Springfield, IL",
  //   },
  //   {
  //     username: "james_white",
  //     email: "james.white@example.com",
  //     phoneNumber: "555-876-5432",
  //     address: "852 Spruce St, Springfield, IL",
  //   },
  //   {
  //     username: "mia_harris",
  //     email: "mia.harris@example.com",
  //     phoneNumber: "555-234-5678",
  //     address: "951 Cherry St, Springfield, IL",
  //   },
  // ];
  const { allUsers, setAllUsers } = useContext(UserContext);
  const [userData, setUserData] = useState({});
  const [query, setQuery] = useState("");
  const filteredUsers = allUsers.filter((user) =>
    Object.values(user).some((value) =>
      value.toString().toLowerCase().includes(query.toLowerCase())
    )
  );
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const showProfile = async (userId) => {
    handleShow();
    const result = await getUserData({ userId });
    console.log("resultresult", result.data[0]);

    setUserData(result.data[0]);
  };
  return (
    <div className="w-100 h-[550px] overflow-auto">
      <div className=" d-flex  ">
        <div className="w-2/3 bg-gray-100 m-4 ms-5 border-b-gray-600 border-b-2 text-xl flex justify-between items-center px-3">
          <input
            type="text"
            placeholder="Search User"
            className="border-0 outline-none w-5/6 bg-transparent"
            onChange={(e) => setQuery(e.target.value)}
          />
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <div className="w-1/3 p-3 rounded-lg me-9 shadow  m-3 flex justify-center items-center  ">
          <h3 className="">
            Total Users :
            <span className="text-3xl text-gray-700">{allUsers.length}</span>
          </h3>
        </div>
      </div>
      <div className="table px-5 ">
        <table
          class="table table-striped w-100"
          //   style={{ overflowY: "auto", maxHeight: "40vh" }}
        >
          <thead className="bg-dark" style={{ background: "#29355f" }}>
            <tr className="table-dark ">
              <th scope="col">#</th>
              <th scope="col">UserName</th>
              <th scope="col">Email</th>
              <th scope="col">PhoneNumber</th>
              <th scope="col">View</th>
              {/* <th scope="col">Delete</th> */}
            </tr>
          </thead>
          <tbody className="p-5 ">
            {filteredUsers && filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr className="w-25" style={{ overflowX: "auto" }}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <i
                      onClick={() => showProfile(user._id)}
                      class="fa-solid fa-eye  text-gray-900 cursor-pointer"
                    ></i>
                  </td>
                  {/* <td>
                    <i class="fa-solid fa-trash text-danger"></i>
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colspan="6">
                  <h1 className="text-danger text-center">Users Not Found!</h1>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{userData.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex gap-10 p-3">
            {/* <img
              src={`${server_url}/uploads/${userData.profilePicture}`}
              alt={userData.name}
              className="w-32 h-32 rounded-full border-3 border-gray-400"
            /> */}
            <div
              className="w-32 h-32 rounded-full border-3 border-gray-400"
              style={{
                backgroundImage: `url(${server_url}/uploads/${userData.profilePicture})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>

            <div className="w-1/2">
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <p>
                <strong>Phone:</strong> {userData.phone}
              </p>
              <p>
                <strong>Address:</strong> {userData.address}
              </p>
              <p>
                <strong>Location:</strong> {userData.location}
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
 
export default ViewUsers;
