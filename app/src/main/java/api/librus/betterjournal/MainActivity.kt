package api.librus.betterjournal

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class MainActivity : AppCompatActivity() {

    private lateinit var loginEditText: EditText
    private lateinit var passwordEditText: EditText
    private lateinit var loginButton: Button
    private lateinit var timetableButton: Button

    private var token: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        loginEditText = findViewById(R.id.loginEditText)
        passwordEditText = findViewById(R.id.passwordEditText)
        loginButton = findViewById(R.id.loginButton)
        timetableButton = findViewById(R.id.timetableButton)

        loginButton.setOnClickListener { login() }
        timetableButton.setOnClickListener { getTimetable() }
    }

    private fun login() {
        val login = loginEditText.text.toString()
        val password = passwordEditText.text.toString()

        RetrofitClient.api.login(login, password).enqueue(object : Callback<String> {
            override fun onResponse(call: Call<String>, response: Response<String>) {
                if (response.isSuccessful) {
                    token = response.body()
                    Toast.makeText(this@MainActivity, "Zalogowano pomyślnie", Toast.LENGTH_SHORT).show()
                } else {
                    Toast.makeText(this@MainActivity, "Błąd logowania", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<String>, t: Throwable) {
                Toast.makeText(this@MainActivity, "Błąd: ${t.message}", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun getTimetable() {
        if (token == null) {
            Toast.makeText(this, "Najpierw zaloguj się!", Toast.LENGTH_SHORT).show()
            return
        }

        val from = "2024-01-01" // przykładowa data
        val to = "2024-01-07"   // przykładowa data

        RetrofitClient.api.getTimetables("Bearer $token", from, to).enqueue(object : Callback<TimetableResponse> {
            override fun onResponse(call: Call<TimetableResponse>, response: Response<TimetableResponse>) {
                if (response.isSuccessful) {
                    val timetable = response.body()
                    // Wyświetl plan lekcji w interfejsie użytkownika
                } else {
                    Toast.makeText(this@MainActivity, "Błąd pobierania planu lekcji", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<TimetableResponse>, t: Throwable) {
                Toast.makeText(this@MainActivity, "Błąd: ${t.message}", Toast.LENGTH_SHORT).show()
            }
        })
    }
}
