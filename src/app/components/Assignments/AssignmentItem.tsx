import * as React from 'react';
import { Card, CardHeader } from 'reactstrap';
import { classNames } from 'core/styles';
import './index.scss';

import AssignmentItemBody from './AssignmentItemBody';
import AssignmentItemForm, { AssignmentFormData } from './AssignmentItemForm';
import { INormalizeAssignment } from 'core/reducers/assignments';

const cn = classNames(require('./index.scss'));

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
        const { status, title, urlToDescription, score, _id } = this.props.assignment.assignment;
        const { isEndAssignment } = this.props.assignment;
        return (
            <Card
                className={`bm-3 mb-4 flex-grow-0 flex-shrink-1 ${cn('card')} bg-secondary ${
                    status === 'Checked' && score < 100
                        ? 'border-warning'
                        : status === 'Checked' && score === 100
                            ? `border-success`
                            : null
                }`}
            >
                {isEndAssignment ? (
                    <CardHeader className="text-white bg-danger">The deadline has passed!</CardHeader>
                ) : status === 'Assigned' ? (
                    <CardHeader>Not submitted yet!</CardHeader>
                ) : status === 'Checked' && score < 100 ? (
                    <CardHeader className="text-white bg-warning">
                        Not submitted yet!
                        <span className={cn('score')}>{score}%</span>
                    </CardHeader>
                ) : status === 'Checked' && score === 100 ? (
                    <CardHeader className="text-white bg-success">
                        Done!
                        <span className={cn('score')}>{score}%</span>
                    </CardHeader>
                ) : null}
                <AssignmentItemBody title={title} urlToDescription={urlToDescription} />
                <AssignmentItemForm
                    isEndAssingment={isEndAssignment}
                    status={status}
                    onSubmit={this.handleSubmitAssignment}
                    form={'form-' + _id.toString()}
                />
            </Card>
        );
    }
}

export default AssignmentItem;