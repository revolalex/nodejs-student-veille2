/* --------------------------------------------------------------------------------------------
       * ---------------------------------------------------------------------------------------------
       *En cours -------------------------------------------------------------------------------------
       * ---------------------------------------------------------------------------------------------
       * */

      // dictionnaire d'étudiant
      var studentArray = [];

      // dictionnaire de techno
      var technoArray = [];

      var veilleStudent = [];

      // object Json
      var jsonObject = {};

      /**
       * ---------------------------------------------------------------------------------------------
       * Ajouter un etudiant -------------------------------------------------------------------------
       * ---------------------------------------------------------------------------------------------
       */
      function addStudent() {
        // récupère la saise
        var saisie = document.getElementById("inputName").value;

        // encours ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        // ajoute la saisie (l'étudiant) à notre studentArray
        studentArray.push(saisie);
        console.log(studentArray);

        if (saisie == "") {
          window.alert("Merci de saisir un nom d'étudiant");
        } else {
          // code HTML avec la valeur de saisie
          var student = `<li>${saisie}</li>`;
          // position pour insertAdjacentHTML
          var position = "beforeend";
          // récupere la div avec les prénoms
          var myList = document.getElementById("myList");
          //ajoute student à mylist
          myList.insertAdjacentHTML(position, student);
          // clean l'input
          document.getElementById("inputName").value = "";
        }
      }

      /** -----------------------------------------------------------------------------------------------
       * Créer un tableau d'étudiant disponible ---------------------------------------------------------
       * ------------------------------------------------------------------------------------------------
       *
       */
      // fonction qui cré un tableau des student sans class
      function checkClass() {
        // reécupere la liste d'étudiant
        var studentList = document.querySelectorAll("li");
        // initialise un tableau vide
        var newStudentList = [];

        // on boucle sur le tableau d'étudiant
        studentList.forEach((element) => {
          // si il à pas la class aRayer
          if (!element.classList.contains("aRayer")) {
            // on ajoute l'etudiant dans un nouveau tableau
            newStudentList.push(element);
          }
        });
        // renvoie nouveau tableau d'étudiant sans class
        return newStudentList;
      }

      /**
       * -----------------------------------------------------------------------------------------------
       * Attribuer une Veille --------------------------------------------------------------------------
       * -----------------------------------------------------------------------------------------------
       */
      // elle s'execute quand on clique sur le bouton
      function add() {
        // récupère la saise
        var saisie2 = document.getElementById("inputTechno").value;

        technoArray.push(saisie2);
        console.log(technoArray);

        // declare un tableau en utilisant la fonction qui nous renvoie un tableau d'étudiant sans class
        let noClassArray = checkClass();

        // si le dictionnaire n'est pas vide
        if (noClassArray && noClassArray.length) {
          // not empty
          // on choisit au hasard un étudiant sans class
          let randomStudent =
            noClassArray[Math.floor(Math.random() * noClassArray.length)];

          // on lui donne la classe aRayer
          randomStudent.classList.add("aRayer");

          // on récupere le prenom de l'étudiant
          var name = randomStudent.textContent;
          // on créer le code HTML
          var text = `<p>${name}  ===>  ${saisie2}</p>`;

          // on récupere la div ou on va insérer le code HTML
          var myDiv = document.getElementById("nomVeille");
          // insere text
          myDiv.insertAdjacentHTML("beforeend", text);
          // clean l'input
          document.getElementById("inputTechno").value = "";

          var veilleElement = document.getElementById("nomVeille");
          var veilleAssigner = veilleElement.textContent;
          console.log(veilleAssigner);
          veilleStudent.push(veilleAssigner);
          console.log("veille et étudiant" + veilleStudent);
        } else {
          window.alert("Plus détudiant libre");
        }
      }

      /**
       * -----------------------------------------------------------------------------------------------------------------------------
       * REFRESH BUTTON FUNCTION -----------------------------------------------------------------------------------------------------
       * -----------------------------------------------------------------------------------------------------------------------------
       */
      function refreshStudent() {
        // sélectionne la liste d'étudiant avec l'id "myList"
        var studentList = document.getElementById("myList");
        // Supprime tous les enfant de "myList"
        while (studentList.firstChild) {
          studentList.removeChild(studentList.firstChild);
        }
      }

      function refreshVeille() {
        // sélectionne les veille et les Student avec l'id "nomVeille"
        var veilleElement = document.getElementById("nomVeille");
        // Supprime tous les enfant de "nomVeille"
        while (veilleElement.firstChild) {
          veilleElement.removeChild(veilleElement.firstChild);
        }
      }

      function refreshFunction() {
        refreshStudent();
        refreshVeille();
      }

      function freeStudent() {
        // reécupere la liste d'étudiant
        var studentList = document.querySelectorAll("li");
        // je fais une boucle dans ma liste d'étudiant
        for (i = 0; i < studentList.length; i++) {
          // si étudiant à la class aRayer
          if (studentList[i].classList.contains("aRayer")) {
            //remove la class aRayer
            studentList[i].classList.remove("aRayer");
            // ajoute la class nonRayer
            studentList[i].classList.add("nonRayer");
          }
        }
      }