import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [records, setRecords] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updatedRecords = records.map((record, index) =>
        index === currentIndex ? { name, email } : record
      );
      setRecords(updatedRecords);
      setIsEditing(false);
      setCurrentIndex(null);
    } else {
      setRecords([...records, { name, email }]);
    }
    setName("");
    setEmail("");
  };

  const handleDelete = (index) => {
    const updatedRecords = records.filter((_, i) => i !== index);
    setRecords(updatedRecords);
  };

  const handleEdit = (index) => {
    const record = records[index];
    setName(record.name);
    setEmail(record.email);
    setIsEditing(true);
    setCurrentIndex(index);
  };

  return (
    <>
      <div className="bg-[#f1f1f1] grid-cols-1 lg:flex w-full h-screen">
        <div className="w-full flex items-center justify-center lg:w-1/2 p-3">
          <div className="bg-white px-10 py-14 rounded-3xl border-2 border-gray-200 mx-2">
            <h1 className="text-5xl font-semibold">Welcome</h1>
            <p className="font-medium text-lg text-gray-500 mt-4">
              Welcome back to palipoint! Please enter your details.
            </p>
            <form action="" onSubmit={handleSubmit}>
              <div className="mt-8">
                <div>
                  <label htmlFor="name" className="text-lg font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                    id="name"
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="text-lg mt-2 font-medium">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                    id="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mt-8">
                  <span>
                    By Submitting Form,
                    <p>
                      You agree to{" "}
                      <span className="text-violet-500 cursor-pointer">
                        palipoint.com
                      </span>{" "}
                      Privacy Policy and Terms Of Use
                    </p>
                  </span>
                </div>
                <div className="mt-8 flex flex-col gap-y-4">
                  <button className="bg-violet-500 text-white text-lg font-semibold py-3 rounded-xl active:scale-[0.98] transition-all active:duration-100 hover:scale-[1.01] ease-in-out">
                    {isEditing ? "Update" : "Submit"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className=" w-full lg:w-1/2 items-center justify-center bg-gray-200 p-5">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><span className="font-medium text-xl">Name</span></TableCell>
                  <TableCell><span className="font-medium text-xl">Email</span></TableCell>
                  <TableCell><span className="font-medium text-xl">Action</span></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>{record.name}</TableCell>
                    <TableCell>{record.email}</TableCell>
                    <TableCell style={{display:"flex"}}>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => handleEdit(index)}
                        style={{ marginRight: "10px" }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}

export default App;
