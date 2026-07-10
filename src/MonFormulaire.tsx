// installer dans le projet : npm install react-hook-form

// On importe la librairie useForm
// useForm est un hook fourni par la bibliothèque React Hook Form.
// Son rôle est de faciliter la gestion des formulaires :
// récupérer les valeurs saisies
// vérifier les champs
// gérer les erreurs
// gérer l'envoi du formulaire

// Sans React Hook Form, il faudrait écrire beaucoup plus de code.
import { useForm } from "react-hook-form";
import "./MonFormulaire.css";

function MonFormulaire() {

// useForm() : initialise la gestion du formulaire.
// register : relie les champs à React Hook Form.
// handleSubmit : gère l'envoi du formulaire.
// errors : contient les erreurs de validation.
// onSubmit(data) : est exécutée lorsque le formulaire est valide et reçoit les données saisies.


// useForm renvoit un objet. 
// On extrait directement les éléments qui nous intéressent :
 // const register = useForm();
// const handleSubmit = useForm();
// const errors = useForm();
          
    const {
        register,
    // - register : permet d'enregistrer et gérer des inputs. Il sert à connecter un champ HTML à REACT Hook Form
    // Exemple : <imput {...register("lastName")} />
    //    Ici :
    //    "lastName" est le nom du champ
    //     React Hook Form va suivre sa valeur
    //     Si l'utlisateur tape "Michel", la valeur du champ lastName sera "Michel"

        handleSubmit,
    // - handleSubmit : gère la soumission du formulaire
    // Exemple avec "  <form onSubmit={handleSubmit(onSubmit)}>"
    // Quand l'utilisateur clique sur Envoyer :
    // React Hook Form vérifie les champs.
    // S'il n'y a pas d'erreur :
// onSubmit(data)
    // Si des erreurs existent : elles sont stockées dans errors.
    // formState: { errors },
    formState: { errors }
// errors contient toutes les erreurs de validation du formulaire.
// Par exemple :
// <input
//     {...register("email", {
//         required: "Email obligatoire"
//     })}
// />Si l'utilisateur laisse le champ vide :
// errors = {
//     email: {
//         type: "required",
//         message: "Email obligatoire"
//     }
// }
// On peut afficher le message :
// {errors.email && <p>{errors.email.message}</p>}
// Résultat : Email obligatoire
    } = useForm();

    console.log(errors)


    // La fonction onSubmit est appelée lorsque le formulaire est envoyé avec succès. Ainsi, les données saisies seront affichées dans la console
    const onSubmit = (data) => console.log(data);



    
// Définir une obligation d'avoir 18 ans, avec un message si l'utilisateur n'est pas majeur.

function checkAge(value) {
    // Vérifie si la personne est majeure
    if (value >= 18) {
        // La condition est vraie
        return true;
    } else {

        // La condition est fausse
        return "Vous devez avoir au moins 18 ans";
    }
}


    return (
        <main>
            <form onSubmit={handleSubmit(onSubmit)}>

                <label htmlFor="lastName">lastName:</label>
                <input
                    type="text"
                    {...register("lastName", {
                        required: "Le nom est obligatoire",
                        pattern: {
                            value: /^[A-Za-z]+$/i,
                            message: "Le nom ne doit contenir que des lettres",
                        },
                        minLength: {
                            value: 3,
                            message: "Le nom doit contenir au moins 3 caractères",
                        },
                        maxLength: {
                            value: 50,
                            message: "Le nom doit contenir au maximum 50 caractères",
                        },
                    })}
                />

                {errors.lastName && <p>{errors.lastName.message}</p>}
             
            <label htmlFor="firstName">firstName:</label>
                <input
                    {...register("firstName", {
                        required: "Le prénom est obligatoire",
                        maxLength: {
                            value: 20,
                            message: "Le prénom ne doit pas dépasser 20 caractères",
                        },
                    })}
                />
                {errors.firstName && <p>{errors.firstName.message}</p>}

                <label htmlFor="year">year:</label>
                <input
                    type="number"
                    {...register("year", {
                        required: "L'âge est obligatoire",
                        validate: checkAge,
                        // Quand l'utilisateur saisit un âge :
                        // React Hook Form appelle checkAge(value).
                        // Si la fonction retourne true, le champ est valide.
                        // Si elle retourne un texte, ce texte devient le message d'erreur.
                    })}
                />
                {errors.year && <p>{errors.year.message}</p>}

                <label htmlFor="email">email:</label>
                <input
                    type="email"
                    {...register("email", {
                        required: "Email obligatoire",
                        pattern: {
                            value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                            message: "Format d'email invalide",
                        },
                    })}
                />
                {errors.email && <p>{errors.email.message}</p>}

                <label htmlFor="password">password:</label>
                <input
                    type="password"
                    {...register("password", {
                    required: "Mot de passe obligatoire",
                    })}
            />
                {errors.password && <p>{errors.password.message}</p>}
                <input type="submit" />
            </form>
        </main>
    );


    // Résumé : 
// Utilisateur remplit le formulaire
//                  │
//                  ▼
//       handleSubmit(onSubmit)
//                  │
//         Vérifie les champs
//                  │
//        ┌─────────┴─────────┐
//        │                   │
//    Pas d'erreur       Erreurs
//        │                   │
//        ▼                   ▼
//  onSubmit(data)       errors
//        │
//        ▼
//  console.log(data)

// Remarque : Il est également possible de définir séparément des règles séparées qui permettent d'être réutilisables 
    // const validationRules = {
    //       lastName: {
    //         required: "Last Name is required",
    //         minLength: { value: 3, message: "Name must be at least 3 characters" },
    //         maxLength: { value: 50, message: "Name must be less than 50 characters" },
    //     },
    //     firstName: {
    //         required: "First Name is required",
    //         minLength: { value: 3, message: "Name must be at least 3 characters" },
    //         maxLength: { value: 50, message: "Name must be less than 50 characters" },
    //     },
    //   year:{
    //     requiered: "year is required",
    //   },
    //     email: {
    //         required: "Email is required",
    //         
    //     password:{
    //         required: "year is requiered"
    //     }
    // }



}
export default MonFormulaire;
