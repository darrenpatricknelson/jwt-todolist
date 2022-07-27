


const ContentForm = () => {
    return (
        <div className="content-form-container">
            <h4>Add a new task</h4>
            <form className="content-form form">
                <textarea type="text" placeholder="Enter your task..." />
                <button className="active">Submit</button>
            </form>
        </div>
    );
};

export default ContentForm;