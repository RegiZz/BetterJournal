package api.librus.betterjournal
import retrofit2.Call
import retrofit2.http.*

interface LibrusApi {
    @FormUrlEncoded
    @POST("/api/librus/login")
    fun login(
        @Field("login") login: String,
        @Field("password") password: String
    ): Call<String>

    @GET("/api/librus/timetables")
    fun getTimetables(
        @Header("Authorization") token: String,
        @Query("from") from: String,
        @Query("to") to: String
    ): Call<TimetableResponse>
}
