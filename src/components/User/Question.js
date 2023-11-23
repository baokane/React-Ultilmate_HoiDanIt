import _ from 'lodash';

const Question = (props) => {
    const { data, index } = props;
    if (_.isEmpty(data)) {
        return <></>;
    }
    return (
        <>
            <div className="q-image">
                <img src={`data:image/png;base64, ${data.image}`} alt="anh" />
            </div>
            <div className="question">
                Question {index + 1}: {data.questionDescription}
            </div>
            <div className="answers">
                {data.answers &&
                    data.answers.length &&
                    data.answers.map((a, index) => {
                        return (
                            <div key={`answers-${index}`} className="a-child">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" />
                                    <label className="form-check-label">{a.description}</label>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default Question;
