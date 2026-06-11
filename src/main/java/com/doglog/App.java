package com.doglog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Classe principal do DogLog Backend.
 * A anotação @SpringBootApplication ativa três coisas:
 * - @Configuration: permite definir beans de configuração
 * - @EnableAutoConfiguration: configura automaticamente o Spring
 * - @ComponentScan: varre o pacote em busca de componentes
 */
@SpringBootApplication
public class App {
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }
}