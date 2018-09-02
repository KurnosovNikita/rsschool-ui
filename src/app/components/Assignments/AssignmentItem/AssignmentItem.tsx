import * as React from 'react';
import { Card, CardHeader } from 'reactstrap';
import AssignmentItemBody from '../AssignmentItemBody/AssignmentItemBody';
import AssignmentItemForm, { AssignmentFormData } from '../AssignmentItemForm/AssignmentItemForm';
import { INormalizeAssignment } from 'core/reducers/assignments';
import { classNames } from 'core/styles';
import { setCardStyle } from 'core/helpers';

const cn = classNames(require('../index.scss'));

type AssignmentItemProps = {
    assignment: INormalizeAssignment;
    updateAssignment: (assignment: INormalizeAssignment) => void;
};

class AssignmentItem extends React.PureComponent<AssignmentItemProps> {
    handleSubmitAssignment = ({ assignmentRepo, studentComment }: AssignmentFormData) => {
        const { assignment } = this.props;
        const data = {
            ...assignment,
            assignment: {
                ...assignment.assignment,
                completeDate: Date.now(),
                assignmentRepo: assignmentRepo,
                studentComment: studentComment,
            },
        };
        this.props.updateAssignment(data);
    };

    render() {
        const { isEndAssignment } = this.props.assignment;
        const { status, title, urlToDescription, score, _id } = this.props.assignment.assignment;
        const card = setCardStyle(isEndAssignment, score, status);

        return (
            <Card className={`bm-3 mb-4 flex-grow-0 flex-shrink-1 ${cn('card')}  ${card.className}`}>
                <CardHeader className={`${card.cardHeader.className}`}>
                    {card.cardHeader.title}
                    {score !== 0 ? <span className={cn('score')}>{score}%</span> : null}
                </CardHeader>
                <AssignmentItemBody title={title} urlToDescription={urlToDescription} />
                {status === 'Assigned' &&
                    !isEndAssignment && (
                        <AssignmentItemForm onSubmit={this.handleSubmitAssignment} form={`form-${_id}`} />
                    )}
            </Card>
        );
    }
}

export default AssignmentItem;
