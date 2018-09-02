import * as React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Badge } from 'reactstrap';
import Assignments from 'components/Assignments';
import { fetchAssignments, updateAssignment } from 'core/actions';
import { classNames } from 'core/styles';
import './index.scss';
import { INormalizeAssignment } from 'core/reducers/assignments';
import { RootState } from 'core/reducers';

const cn = classNames(require('./index.scss'));

type AssignmentsContainerProps = {
    onLoad: (id: string) => void;
    courseId: string;
    isAdmin: boolean;
    userProfile: string;
    assignments: INormalizeAssignment[];
    isLoading: boolean;
    updateAssignment: (assignment: INormalizeAssignment) => void;
};

class AssignmentsContainer extends React.Component<AssignmentsContainerProps> {
    componentDidMount() {
        this.props.onLoad(this.props.courseId);
    }

    getFullScore(): number {
        const { assignments } = this.props;
        let score = 0;
        assignments.forEach(assignmentItem => {
            score += assignmentItem.assignment.score;
        });
        return score;
    }

    render() {
        const { courseId, assignments, isLoading, isAdmin } = this.props;
        return (
            !isAdmin && (
                <div className="tasks">
                    <h2>TASKS</h2>
                    <Row>
                        <Col xs="6">
                            <p>
                                Your github private repository
                                <Badge color="dark" href="#" className={cn('badge')}>
                                    {' '}
                                    here
                                </Badge>
                            </p>
                        </Col>
                        <Col xs="6" className="text-right">
                            <p>You are in the TOP 50 students!</p>
                            <p>Full Score: {this.getFullScore()}</p>
                        </Col>
                    </Row>
                    {isLoading ? (
                        <h3>Loading...</h3>
                    ) : (
                        <Assignments
                            courseId={courseId}
                            assignments={assignments}
                            updateAssignment={this.props.updateAssignment}
                        />
                    )}
                </div>
            )
        );
    }
}

const mapStateToProps = (state: RootState, props: any): AssignmentsContainerProps => {
    if (state.assignments == null || state.user == null) {
        return props;
    }
    return {
        ...props,
        courseId: props.match.params.id,
        isAdmin: state.user.isAdmin,
        assignments: state.assignments.assignments,
        isLoading: state.assignments.isLoading,
    };
};

const mapDispatchToProps = (dispatch: any, props: any): AssignmentsContainerProps => {
    return {
        ...props,
        onLoad: id => {
            dispatch(fetchAssignments(id));
        },
        updateAssignment: (assignment: INormalizeAssignment) => {
            dispatch(updateAssignment(assignment));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AssignmentsContainer);
