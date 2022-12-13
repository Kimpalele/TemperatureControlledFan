
const int sensorPin = A0;

void setup() {
  
  Serial.begin(9600);
  
  for (int pinNumber = 2; pinNumber < 5; pinNumber++) {
    pinMode(pinNumber, OUTPUT);
    digitalWrite(pinNumber, LOW);
  }
}

void loop() {
  int sensorVal = analogRead(sensorPin);

  // convert the ADC reading to voltage
  float voltage = (sensorVal / 1024.0) * 5.0;

  // convert the voltage to temperature in degrees C
  // the sensor changes 10 mV per degree
  // the datasheet says there's a 500 mV offset
  // ((voltage - 500 mV) times 100)
  float temperature = (voltage - .5) * 100;
  Serial.println(temperature);
  
  #Sending temp every 5 minutes
  delay(300000);
}
  

