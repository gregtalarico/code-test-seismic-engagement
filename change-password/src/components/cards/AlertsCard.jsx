import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth.context';


export const AlertsCard = () => {
    const { dismissAlert, suggestPasswordChange, breachedAccounts } = useContext(AuthContext);

    return (
        <div style={{marginBottom: ".25rem" }}>
            { suggestPasswordChange 
                ? (
                    <div className="card has-alert">
                        <div className="card-header">Alert</div>
                        <div className="card-body">
                            <p>Your email was involved in a breach on the following sites:</p>
                            <ul>
                                {breachedAccounts.map((account) => {
                                    const date = new Date(account.addedDate);
                                    return <li key={account.id}>{date.toLocaleString()} - {account.name}</li>
                                })}
                            </ul>
                            <p>Although your information on our site is safe, we recommend you change your password in case your AppCo account shares a password with any of the sites above.</p>
                            <div className="cta">
                                <button className="btn" onClick={dismissAlert}>Dismiss</button>&nbsp;
                                <button className="btn btn-primary">Change Password</button>
                            </div>
                        </div>
                    </div>
                )
                :  <div className="card no-alert"><div className="card-header">No Alerts</div></div>
            }
        </div>
    );
}