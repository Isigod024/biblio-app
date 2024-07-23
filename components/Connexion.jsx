'use client'
import styles from './Form.module.css'
import { useForm } from 'react-hook-form'
import { useState } from 'react';
export default function Connexion() {
    const [reponse, setReponse] = useState(''); //Pour contenir la reponse du serveur
    const {
        register,
        handleSubmit, getValues,
        formState: { errors }
    } = useForm({
        defaultValues: {
            password: '',
            courriel: ''
        }
    });
 
    const onSubmit = async () => {
        const values = getValues();
        try {
            const response = await fetch(`/api/connexion?courriel=${values.courriel}&password=${values.password}`);
 
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setReponse("Connecte ! "+data.email);
            } else {
                setReponse("User non connu");
            }
        } catch (error) {
            console.error("Erreur lors de la tentative : ", error);
            setReponse("Erreur lors de la tentative");
        }
    }
 
    return <>
        <form className={styles.form}
            onSubmit={handleSubmit(onSubmit)}>
            <label>
                Courriel:
                <input
                    type="email"
                    {...register("courriel",
                        {
                            required: 'Champ obligatoire',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Courriel non valide'
                            }
                        })
                    }
                    placeholder='votre courriel'
                />
                <div className={styles.erreur}>{errors.courriel?.message}</div>
            </label>
            <label>
                Password:
                <input
                    type="passwaord"
                    {...register("password",
                        {
                            required: 'Champ obligatoire',
                            minLength: { value: 4, message: "min 4 caractères" }
                        })
                    }
                    placeholder='votre password' />
                <div className={styles.erreur}>{errors.password?.message}</div>
            </label>
            <button type="submit">Se connecter</button>
            <div>{reponse}</div>
        </form>
    </>
}