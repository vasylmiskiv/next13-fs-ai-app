import PromptCard from "./PromptCard";
import Loader from "./Loader";

const Profile = ({ name, desc, data, handleEdit, handleDelete, isLoading }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left blue_gradient">{name} Profile</h1>
      <p className="desc text-left">{desc}</p>

      <div
        className={`mt-20  ${
          isLoading ? `flex justify-center itemsc-center` : `prompt_layout`
        }`}
      >
        {isLoading ? (
          <div className="">
            <Loader />
          </div>
        ) : (
          <>
            {data.map((post) => (
              <PromptCard
                key={post._id}
                post={post}
                handleEdit={() => handleEdit && handleEdit(post)}
                handleDelete={() => handleDelete && handleDelete(post)}
              />
            ))}
            {!data.length && (
              <div className="text-xl font-semibold text-center">
                List of posts is empty
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Profile;
