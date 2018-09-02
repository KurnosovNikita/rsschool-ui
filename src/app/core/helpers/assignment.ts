export function setCardStyle(isEndAssignment: boolean, score: number, status: string) {
    let card = {
        className: '',
        cardHeader: {
            title: '',
            className: '',
        },
    };
    card = isEndAssignment
        ? setStyle('border-danger', 'The deadline has passed!', 'text-white bg-danger')
        : status === 'Assigned'
            ? setStyle('bg-secondary', 'Not submitted yet!', '')
            : status === 'Checked' && score === 100
                ? setStyle('border-success', 'Done!', 'text-white bg-success')
                : setStyle('border-warning', 'Done!', 'text-white bg-warning');

    return card;
}

function setStyle(...styles: string[]) {
    return {
        className: styles[0],
        cardHeader: {
            title: styles[1],
            className: styles[2],
        },
    };
}
