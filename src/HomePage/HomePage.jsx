import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

function HomePage() {
    // const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll(user.username));
    }, []);

    function handleDeleteUser(id) {
        dispatch(userActions.delete(id));
    }

    return (
        <div className="col-lg-12">
            <h1>Criterion.dev {'{ Alpha }'}</h1>

            <p>
                It may seem a little empty here right now, that is because it is brand new!  We will be
                adding more features frequently so come back soon or follow us on twitter for updates.
            </p>

            <div className="criterion-token-card">
                <div className="card-body">
                    <h5 className="card-title">Repository Upload Token</h5>
                    <p className="card-text">Use the token below to upload criterion benchmark results to Criterion.dev.</p>
                    <code>{user.bearer_token}</code>
                </div>
            </div>

            <div className="criterion-token-usage-card">
                <div className="card-body">
                    <h5 className="card-title">GitHub actions upload example</h5>
                    <code>
                        cargo bench -- --verbose --noplot --save-baseline criterion.dev.temp
                        <br /><br />
                        find $(find . -type d -name criterion.dev.temp) -name raw.csv && \
                        curl -F "raw.csv=@$(find $(find . -type d -name criterion.dev.temp) -name raw.csv)" \
                        -H "Content-Type: multipart/form-data" \
                        https://api.criterion.dev/{'${{ github.repository }}'}/measurements?token={'${{ secrets.CRITERION_TOKEN }}'}

                    </code>
                </div>
            </div>

            <hr/>
            <p>
                For support and feature requests please visit
                <a href={"https://github.com/chmoder/api.criterion.dev"}> our support page</a>.
            </p>

            <p>
                <Link to="/login">Logout</Link>
            </p>
        </div>
    );
}

export { HomePage };