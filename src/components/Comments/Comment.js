import * as commentService from "../../services/commentService";
import { useContext, useEffect, useState, React } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import * as countriesService from "../../services/countriesService";
import ConfirmDialog from "../common/ConfirmDialog";

const Comment = ({ comment }) => {
  const { user } = useContext(AuthContext);
  let [pastComment, setComment] = useState({});
  let { locationName, locationId } = useParams();
  const [location, setLocation] = useState({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    countriesService.getOne(locationId).then((locationResult) => {
      setLocation(locationResult);
    });
  }, [locationId]);

  useEffect(() => {
    commentService.getOne(comment._id).then((result) => {
      setComment(result);
    });
  }, [comment._id]);

  const deleteHandlerComment = (e) => {
    e.preventDefault();

    commentService.destroy(comment._id, user.accessToken).finally(() => {
      setShowDeleteDialog(false);
    });
  };
  const deleteClickHandler = (e) => {
    e.preventDefault();
    setShowDeleteDialog(true);
  };

  const ownerDelete = (
    <button
      className="btn btn-primary btn-sm shadow-none"
      id="deleteComment"
      onClick={deleteClickHandler}
    >
      Delete
    </button>
  );

  return (
    <>
      <ConfirmDialog
        show={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onSave={deleteHandlerComment}
      />
      <div className="comment-wrapper">
        <div className="d-flex justify-content-center row">
          <div className="col-md-8">
            <div className="commenting-box" id="commenting-box">
              <div className="bg-white p-2">
                <div className="d-flex flex-column justify-content-start ml-2">
                  <span className="d-block font-weight-bold name">
                    Username: {comment.username}
                  </span>
                </div>
              </div>

              <div className="mt-2">
                <p className="comment-text">{comment.comment}</p>
              </div>

              <div className="mt-2 text-right">
                {user._id == comment._ownerId ? ownerDelete : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;