import React, { useEffect, useState } from "react";
import { getAllBlog, editBlog } from "../services/allAPI";
import { Modal, Button } from "react-bootstrap";

function ListItems() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [editedBlogData, setEditedBlogData] = useState({
    title: "",
    image: "",
    description: "",
  });
  const [showEditModal, setShowEditModal] = useState(false);

  const getBlogs = async () => {
    try {
      const { data } = await getAllBlog();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleEdit = (blogId) => {
    // Set the selected blog ID for editing
    setSelectedBlogId(blogId);

    // Find the selected blog from the blogs array
    const selectedBlog = blogs.find((blog) => blog.id === blogId);

    // Set the edited blog data for pre-filling the edit form
    setEditedBlogData({
      title: selectedBlog.title,
      image: selectedBlog.image,
      description: selectedBlog.description,
    });

    // Show the edit modal
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      // Make the edit request
      await editBlog(selectedBlogId, editedBlogData);
      alert("Successfull Edit This ");

      // Reset the selected blog ID and edited data
      setSelectedBlogId(null);
      setEditedBlogData({
        title: "",
        image: "",
        description: "",
      });

      // Fetch the updated blog list
      getBlogs();

      // Close the edit modal
      setShowEditModal(false);
    } catch (error) {
      console.error("Error editing blog:", error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {blogs.map((blog) => (
          <div key={blog.id} className="col-md-3 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <div>
                  <img
                    src={blog.image}
                    alt=""
                    srcSet=""
                    style={{ height: "200px", width: "100%" }}
                  />
                </div>
                <p className="card-text">{blog.description.slice(0, 180)}...</p>
                <button
                  className="btn btn-primary w-100"
                  onClick={() => handleEdit(blog.id)}
                >
                  Edit
                </button>
                {/* Add more details as needed */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="editTitle">Title</label>
            <input
              type="text"
              className="form-control"
              id="editTitle"
              value={editedBlogData.title}
              onChange={(e) =>
                setEditedBlogData({
                  ...editedBlogData,
                  title: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="editImage">Image URL</label>
            <input
              type="text"
              className="form-control"
              id="editImage"
              value={editedBlogData.image}
              onChange={(e) =>
                setEditedBlogData({
                  ...editedBlogData,
                  image: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="editDescription">Description</label>
            <textarea
              className="form-control"
              id="editDescription"
              rows="3"
              value={editedBlogData.description}
              onChange={(e) =>
                setEditedBlogData({
                  ...editedBlogData,
                  description: e.target.value,
                })
              }
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="success" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ListItems;
